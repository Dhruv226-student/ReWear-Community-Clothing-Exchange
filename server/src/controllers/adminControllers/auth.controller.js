const httpStatus = require('http-status');
const { userService, tokenService, roleService } = require('../../services');
const ApiError = require('../../utils/apiError');
const catchAsync = require('../../utils/catchAsync');
const MESSAGE = require('../../config/message.json');
const { ROLES } = require('../../helper/constant.helper');

/**
 * All admin controllers are exported from here 👇
 */
module.exports = {
    /**
     * POST: Admin login.
     */
    adminLogin: catchAsync(async (req, res) => {
        const { body } = req;
        let data = {};

        //Old Code

        // let emailExist = await userService.getAdminByEmail(body.email); // Get admin by email.

        // new Code
        const adminRoleId = (await roleService.getRoleByName(ROLES.admin))._id; // Get admin role ID.
        let emailExist = await userService.get({
            email: body.email,
            role: adminRoleId,
            deleted_at: null,
        }); // Get admin by email.
        if (!emailExist) {
            throw new ApiError(httpStatus.NOT_FOUND, MESSAGE.email_not_found); // If email doesn't exist, throw an error.
        }

        if (!emailExist.password || !(await emailExist.isPasswordMatch(body.password))) {
            throw new ApiError(httpStatus.UNAUTHORIZED, MESSAGE.password_is_wrong); // If password doesn't match the admin's password, throw an error.
        }

        data.user = emailExist;
        data.tokens = await tokenService.generateAuthTokens(emailExist); // Generate auth tokens.

        res.status(httpStatus.OK).json({
            success: true,
            message: MESSAGE.login_successfully,
            data,
        });
    }),
};
