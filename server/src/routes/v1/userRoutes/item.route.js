const express = require('express');
const validate = require('../../../middlewares/validate');
const itemValidation = require('../../../validations/item.validation');
const itemController = require('../../../controllers/userControllers/item.controller');
const { fileUpload, fileValidation } = require('../../../middlewares/upload');
const { auth } = require('../../../middlewares/auth');
const { ROLES } = require('../../../helper/constant.helper');

const router = express.Router();

/** Create */
router.post(
    '/create-update',
    auth(ROLES.user),
    fileUpload.array('images'),
    fileValidation('array', {
        limit: 5,
        size: 2097152, // Max: 2 MB
        ext: ['jpg', 'jpeg', 'png', 'tiff', 'heic', 'webp'],
    }),
    validate(itemValidation.createItem),
    itemController.createItem
);

/** Get List */
router.get('/list', auth(ROLES.user), validate(itemValidation.getList), itemController.getAllItems);

/** Get Details */
router.get(
    '/details/:itemId',
    auth(ROLES.user),
    validate(itemValidation.getDetails),
    itemController.getDetails
);

/** Delete */
router.delete(
    '/delete/:itemId',
    auth(ROLES.user),
    validate(itemValidation.getDetails),
    itemController.deleteItem
);

module.exports = router;
