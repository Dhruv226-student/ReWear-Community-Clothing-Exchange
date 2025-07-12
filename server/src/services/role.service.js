const httpStatus = require('http-status');
const { Role } = require('../models');
const ApiError = require('../utils/apiError');
const MESSAGE = require('../config/message.json');
/**
 * Get role by name.
 * @param {String} roleName
 * @returns {Promise<Role>}
 */
exports.getRoleByName = async (roleName) => {
    const role = await Role.findOne({ role: roleName, deleted_at: null });

    if (!role) {
        throw new ApiError(httpStatus.NOT_FOUND, MESSAGE.role_not_found); // If role doesn't exist, throw an error.
    }

    return role;
};
