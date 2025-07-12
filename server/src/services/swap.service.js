const { Swap } = require('../models');

/**
 * Create a new swap request.
 * @param {Object} data
 * @returns {Promise<Swap>}
 */
exports.create = async (data) => {
  return Swap.create(data);
};

/**
 * Update a swap by filter.
 * @param {Object} filter
 * @param {Object} update
 * @param {import('mongoose').QueryOptions} options
 * @returns {Promise<Swap>}
 */
exports.update = async (filter, update, options = {}) => {
  return Swap.findOneAndUpdate(filter, update, options);
};

/**
 * Get a single swap by filter.
 * @param {Object} filter
 * @returns {Promise<Swap>}
 */
exports.get = async (filter) => {
  return Swap.findOne(filter).populate('responderItem', 'requesterItem');
};

/**
 * Get multiple swaps by filter.
 * @param {Object} filter
 * @param {Object} options
 * @returns {Promise<Swap[]>}
 */
exports.paginate = async (filter, options = {}) => {
  return Swap.paginate(filter, options);
};

/**
 * Delete a swap (hard delete).
 * @param {Object} filter
 * @returns {Promise<Swap>}
 */
exports.delete = async (filter) => {
  return Swap.deleteOne(filter);
};

/**
 * Aggregate swap queries.
 * @param {Array} pipeline
 * @returns {Promise<any[]>}
 */
exports.aggregate = async (pipeline) => {
  return Swap.aggregate(pipeline);
};
