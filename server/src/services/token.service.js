const moment = require('moment');
const jwt = require('jsonwebtoken');
const { Token, Role } = require('../models');
const config = require('../config/config');
const { TOKEN_TYPES } = require('../helper/constant.helper');
const httpStatus = require('http-status');
const ApiError = require('../utils/apiError');
const MESSAGE = require('../config/message.json');
const { ROLES } = require('../helper/constant.helper');

// === Token Generation ===
const generateToken = (userId, expires, type, role, secret = config.jwt.secret) => {
    const payload = {
        sub: userId,
        iat: moment().unix(),
        exp: expires.unix(),
        type,
        role,
    };
    return jwt.sign(payload, secret);
};

/**
 * Generate access and refresh auth tokens for a user
 * @param {User} user
 * @returns {Promise<{ access: { token: string, expires: Date }, refresh: { token: string, expires: Date } }>}
 */
const generateAuthTokens = async (user) => {
    const roleDetails = await Role.findOne({ _id: user.role });

    if (!roleDetails) {
        throw new ApiError(httpStatus.BAD_REQUEST, MESSAGE.role_not_found);
    }

    const userRole = roleDetails.role === ROLES.user ? ROLES.user : ROLES.admin;

    const accessTokenExpires = moment().add(process.env.JWT_ACCESS_EXPIRATION_MINUTES, 'days');
    const accessToken = generateToken(user._id, accessTokenExpires, TOKEN_TYPES.access, userRole);

    const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
    const refreshToken = generateToken(
        user._id,
        refreshTokenExpires,
        TOKEN_TYPES.refresh,
        userRole
    );

    await saveToken(refreshToken, user._id, refreshTokenExpires, TOKEN_TYPES.refresh);

    return {
        access: {
            token: accessToken,
            expires: accessTokenExpires.toDate(),
        },
        refresh: {
            token: refreshToken,
            expires: refreshTokenExpires.toDate(),
        },
    };
};

// === Generic CRUD Operations ===
const create = async (data) => {
    return Token.create(data);
};

const update = async (filter, data) => {
    return Token.findOneAndUpdate(filter, { $set: data }, { new: true, upsert: false });
};

const get = async (filter) => {
    return Token.findOne(filter);
};

const getAll = async (filter) => {
    return Token.find(filter);
};

const aggregate = async (pipeline) => {
    return Token.aggregate(pipeline);
};

const deleteOne = async (filter) => {
    return Token.deleteOne(filter);
};

/**
 * Delete multiple token by filter and options
 * @param {Object} filter
 * @param {import('mongoose').QueryOptions} options
 * @returns {Promise<Token>}
 */
const deleteMany = async (filter, options = {}) => {
    return Token.deleteMany(filter, options);
};

const softDelete = async (filter) => {
    return Token.findOneAndUpdate(filter, { $set: { blacklisted: true } }, { new: true });
};

// === Specialized Token Logic ===

const saveToken = async (token, userId, expires, type, blacklisted = false) => {
    return Token.findOneAndUpdate(
        { user: userId, type },
        {
            token,
            user: userId,
            expires: expires.toDate(),
            type,
            blacklisted,
        },
        { upsert: true, new: true }
    );
};

const generateOtp = () => ('0000' + Math.floor(Math.random() * 10000)).slice(-4);

const generateOtpToken = async (user) => {
    const expires = moment().add(process.env.OTP_EXPIRATION_MINUTES, 'minutes');
    const otp = generateOtp();
    await saveToken(otp, user._id, expires, TOKEN_TYPES.verifyOtp);
    return otp;
};

module.exports = {
    generateToken,
    generateAuthTokens,
    saveToken,
    generateOtp,
    generateOtpToken,
    create,
    update,
    get,
    getAll,
    aggregate,
    deleteOne,
    deleteMany,
    softDelete,
};
