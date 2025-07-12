const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { ITEM } = require('../helper/constant.helper');

/** Create */
const createItem = {
    body: Joi.object({
        itemId: Joi.string().trim().custom(objectId).optional().allow(''),
        title: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string()
            .valid(...Object.values(ITEM.CATEGORY))
            .required(), // e.g., "Shirt", "Dress"
        type: Joi.string()
            .valid(...Object.values(ITEM.TYPE))
            .required(), // e.g., "Casual", "Formal"
        size: Joi.string()
            .valid(...Object.values(ITEM.SIZE))
            .required(), // e.g., "M", "L", "XL"
        condition: Joi.string()
            .valid(...Object.values(ITEM.CONDITION))
            .required(),
        tags: Joi.array()
            .items(Joi.string().valid(...Object.values(ITEM.TAGS)))
            .min(1)
            .required(),
        remove_images: Joi.array().items(Joi.string()).optional(),
        exchange_points: Joi.number().required(),
    }),
};

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
        itemId: Joi.string().trim().custom(objectId).required(),
    }),
};

/** Update */
const updateItem = {
    params: Joi.object().keys({
        itemId: Joi.string().trim().custom(objectId).required(),
    }),
    body: Joi.object().keys({
        status: Joi.string()
            .valid(...Object.values(ITEM.STATUS))
            .required(),
    }),
};

module.exports = {
    createItem,
    getList,
    getDetails,
    updateItem,
};
