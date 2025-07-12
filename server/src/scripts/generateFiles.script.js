const fs = require('fs');
const path = require('path');

// Get folder and file name from command-line arguments
const folderName = process.argv[2];
const fileName = process.argv[3];

if (!folderName || !fileName) {
    console.error('Please provide both folder name and file name.');
    process.exit(1);
}

// Convert the fileName to PascalCase for class names and camelCase for other usages
const capitalize = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const modelName = capitalize(fileName);

// Paths to the directories based on folder name
const paths = {
    model: path.join(__dirname, `../models`, `${fileName}.model.js`),
    controller: path.join(
        __dirname,
        `../controllers/${folderName}Controllers`,
        `${fileName}.controller.js`
    ),
    service: path.join(__dirname, `../services`, `${fileName}.service.js`),
    validation: path.join(__dirname, `../validations`, `${fileName}.validation.js`),
    routes: path.join(__dirname, `../routes/v1/${folderName}Routes`, `${fileName}.route.js`),
};

// Model template
const modelTemplate = `
const mongoose = require('mongoose');

const ${fileName}Schema = new mongoose.Schema({
    is_active: {
        type: Boolean,
        default: true
    },
    deletedAt: {
        type: Date,
        default: null
    },
},
{
    timestamps: true,
    versionKey: false,
});

module.exports = mongoose.model('${fileName}', ${fileName}Schema);
`;

// Controller template
const controllerTemplate = `
const ApiError = require('../../utils/apiError');
const catchAsync = require('../../utils/catchAsync');
const ${fileName}Service = require('../../services/${fileName}.service');

/** Create */
const create${modelName} = catchAsync(async(req, res) => {
     // Implement your logic here
});

/** Get list */
const getAll${modelName}s = catchAsync(async(req, res) => {
     // Implement your logic here
});

/** Get details */
const getDetails = catchAsync(async(req, res) => {
     // Implement your logic here
});

/** Update */
const update${modelName} = catchAsync(async(req, res) => {
     // Implement your logic here
});

/** Delete */
const delete${modelName} = catchAsync(async(req, res) => {
     // Implement your logic here
});

module.exports = {
    create${modelName},
    getAll${modelName}s,
    getDetails,
    update${modelName},
    delete${modelName},
};

`;

// Service template
const serviceTemplate = `
const ${modelName} = require('../models/${fileName}.model');

/**
 * Create
 * @param {Object} data
 * @returns {Promise<${modelName}>}
 */
exports.create${modelName} = async (data) => {
    return ${modelName}.create(data);
};

/**
 * Get list
 * @param {Object} filter
 * @param {Object} projection
 * @param {import('mongoose').QueryOptions} options
 * @returns {Promise<${modelName}>}
 */
exports.getAll${modelName}s = async (filter, projection = {}, options = {}) => {
    return ${modelName}.find(filter, projection, options);
};

/**
 * Get details
 * @param {Object} filter
 * @param {Object} projection
 * @param {import('mongoose').QueryOptions} options
 * @returns {Promise<${modelName}>}
 */
exports.get${modelName}Dtl = async (filter, projection = {}, options = {}) => {
    return ${modelName}.findOne(filter, projection, options);
};


/**
 * Update
 * @param {Object} filter
 * @param {import('mongoose').UpdateQuery} update
 * @param {import('mongoose').QueryOptions} options
 * @returns {Promise<${modelName}>}
 */
exports.update${modelName} = async (filter, update, options = {}) => {
    return ${modelName}.findOneAndUpdate(filter, update, options);
}

`;

// Validation template
const validationTemplate = `
const Joi = require('joi');
const { objectId } = require('./custom.validation');

/** Create */
const create${modelName} = {
    body: Joi.object().keys({}),
}

/** Get list validation */
const getList = {
    query: Joi.object().keys({
        limit: Joi.number().integer().optional().allow('', null).default(10),
        page: Joi.number().integer().optional().allow('', null).default(1),
        sortBy: Joi.string().trim().optional().allow('', null),
        search: Joi.string().trim().optional().allow('', null),
    }),
};

/** Get details */
const getDetails = {
    params: Joi.object().keys({
        id: Joi.string().trim().custom(objectId).required(),
    }),
}

/** Update */
const update${modelName} = {
    params: Joi.object().keys({
        id: Joi.string().trim().custom(objectId).required(),
    }),
    body: Joi.object().keys({}),
}

module.exports = {
    create${modelName},
    getList,
    getDetails,
    update${modelName}
};
`;

// Routes template
const routesTemplate = `
const express = require('express');
const validate = require('../../../middlewares/validate');
const ${fileName}Validation = require('../../../validations/${fileName}.validation')
const ${fileName}Controller = require('../../../controllers/${folderName}Controllers/${fileName}.controller');

const router = express.Router();

/** Create */
router.post('/create', validate(${fileName}Validation.create${modelName}), ${fileName}Controller.create${modelName});

/** Get List */
router.get('/list', validate(${fileName}Validation.getList), ${fileName}Controller.getAll${modelName}s);

/** Get Details */
router.get('/details/:id', validate(${fileName}Validation.getDetails), ${fileName}Controller.getDetails);

/** Update */
router.put('/update/:id', validate(${fileName}Validation.update${modelName}), ${fileName}Controller.update${modelName})

/** Delete */
router.delete('/delete/:id', validate(${fileName}Validation.getDetails), ${fileName}Controller.delete${modelName})

module.exports = router;
`;

// Function to create the file
const createFile = (filePath, content) => {
    // Ensure directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
        // Create a file on path
        fs.mkdirSync(dir, { recursive: true });
    }

    // Create file if file not exists.
    if (!fs.existsSync(filePath)) {
        // Write the file
        fs.writeFile(filePath, content, (err) => {
            if (err) {
                console.error('Error creating ' + filePath + ':', err);
            } else {
                console.log('File created: ' + filePath);
            }
        });
    }
};

// Create the files
createFile(paths.model, modelTemplate);
createFile(paths.controller, controllerTemplate);
createFile(paths.service, serviceTemplate);
createFile(paths.validation, validationTemplate);
createFile(paths.routes, routesTemplate);
