const passport = require('passport');
const httpStatus = require('http-status');
const Role = require('../models/role.model');
const ApiError = require('../utils/apiError');
const MESSAGE = require('../config/message.json');

// Verify user requests
const verifyCallback = (req, resolve, reject, requiredRights) => async (err, user, info) => {
    if (err || info || !user) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, MESSAGE.unauthorized));
    }

    const role = await Role.findOne({ _id: user.role }); // Get role by _id.
    if (!role) {
        return reject(new ApiError(httpStatus.NOT_FOUND, MESSAGE.role_not_found)); // If role doesn't exist, throw an error.
    }

    if (!requiredRights.includes(role.role)) {
        return reject(new ApiError(httpStatus.FORBIDDEN, MESSAGE.forbidden)); // If user role doesn't include in role require rights, throw an error.
    }

    if (user?.isBlock) {
        return reject(new ApiError(httpStatus.UNAUTHORIZED, MESSAGE.account_blocked)); // If user is block, throw an error.
    }

    req.user = user;
    req.user.role = role;

    resolve();
};

/**
 * Auth middleware.
 * @param  {Array} requiredRights
 * @returns
 */
exports.auth =
    (...requiredRights) =>
    async (req, res, next) => {
        return new Promise((resolve, reject) => {
            passport.authenticate(
                'jwt',
                { session: false },
                verifyCallback(req, resolve, reject, requiredRights)
            )(req, res, next);
        })
            .then(() => next())
            .catch((err) => next(err));
    };

/**
 * If token then decode else give access to get
 * @returns
 */
exports.authorizeV3 = () => async (req, res, next) => {
    const token = req.headers.authorization;

    if (token) {
        return new Promise(() => {
            passport.authenticate('jwt', { session: false })(req, res, next);
        })
            .then(() => next())
            .catch((err) => next(err));
    }

    next();
};
