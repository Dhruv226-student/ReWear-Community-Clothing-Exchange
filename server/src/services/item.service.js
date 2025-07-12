const Item = require('../models/item.model');

/**
 * Create a item constructor
 * @param {Object} data
 * @returns {Promise<>}
 */
exports.createItemConstructor = async (data) => {
    return new Item(data);
};

/**
 * Create
 * @param {Object} data
 * @returns {Promise<Item>}
 */
exports.createItem = async (data) => {
    return Item.create(data);
};

/**
 * Get list
 * @param {Object} filter
 * @param {Object} projection
 * @param {import('mongoose').QueryOptions} options
 * @returns {Promise<Item>}
 */
exports.getAllItems = async (filter, projection = {}, options = {}) => {
    return Item.find(filter, projection, options);
};

/**
 * Get item list with pagination
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Item>}
 */
exports.getAllItemsWithPagination = async (filter, options = {}) => {
    return Item.paginate(filter, options);
};

/**
 * Get details
 * @param {Object} filter
 * @param {Object} projection
 * @param {import('mongoose').QueryOptions} options
 * @returns {Promise<Item>}
 */
exports.getItemDtl = async (filter, projection = {}, options = {}) => {
    return Item.findOne(filter, projection, options);
};

/**
 * Update
 * @param {Object} filter
 * @param {import('mongoose').UpdateQuery} update
 * @param {import('mongoose').QueryOptions} options
 * @returns {Promise<Item>}
 */
exports.updateItem = async (filter, update, options = {}) => {
    return Item.findOneAndUpdate(filter, update, options);
};

/**
 * Delete
 * @param {Object} filter
 * @param {import('mongoose').QueryOptions} options
 * @returns {Promise<Item>}
 */
exports.deleteItem = async (filter, options = {}) => {
    return Item.findOneAndDelete(filter, options);
};
