const httpStatus = require('http-status');
const { userService, tokenService, emailService, roleService } = require('../../services');
const ApiError = require('../../utils/apiError');
const catchAsync = require('../../utils/catchAsync');
const bcrypt = require('bcryptjs');
const { TOKEN_TYPES, ROLES } = require('../../helper/constant.helper');
const MESSAGE = require('../../config/message.json');
/**
 * All user controllers are exported from here 👇
 */
module.exports = {
    /**
     * POST: Register.
     */
  register: catchAsync(async (req, res) => {
    const { body } = req;

    const userRoleId = await roleService.getRoleByName(ROLES.user);

    const emailExist = await userService.get({ email: body.email, deleted_at: null });
    if (emailExist) {
        throw new ApiError(httpStatus.BAD_REQUEST, MESSAGE.email_already_taken);
    }

    const user = await userService.create({
        ...body,
        role: userRoleId._id,
        is_email_verified: true, // Directly mark as verified
    });

    const tokens = await tokenService.generateAuthTokens(user);

    res.status(httpStatus.CREATED).json({
        success: true,
        message: MESSAGE.register_successfully,
        data: { user, tokens },
    });
}),

    /**
     * POST: Login.
     */
  login: catchAsync(async (req, res) => {
    const { body } = req;

    const user = await userService.get({ email: body.email, deleted_at: null });

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, MESSAGE.email_not_found);
    }

    if (user.is_block) {
        throw new ApiError(httpStatus.UNAUTHORIZED, MESSAGE.account_blocked);
    }

    if (!user.password || !(await user.isPasswordMatch(body.password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, MESSAGE.password_is_wrong);
    }

    const tokens = await tokenService.generateAuthTokens(user);

    res.status(httpStatus.OK).json({
        success: true,
        message: MESSAGE.login_successfully,
        data: { user, tokens },
    });
}),


    /**
     * POST: Logout.
     */
    logout: catchAsync(async (req, res) => {
        // const refreshToken = await tokenService.getToken({
        //     token: req.body.refresh_token,
        //     type: TOKEN_TYPES.refresh,
        //     blacklisted: false,
        // }); // Get refresh token by filter.
        const refreshToken = await tokenService.get({
            token: req.body.refresh_token,
            type: TOKEN_TYPES.refresh,
            blacklisted: false,
        }); // Get refresh token by filter.

        if (!refreshToken) {
            throw new ApiError(httpStatus.NOT_FOUND, MESSAGE.refresh_token_not_found); // If refresh token doesn't exist, throw an error.
        }

        // await tokenService.deleteToken(refreshToken.user); // Delete token.
        await tokenService.deleteMany({ user: refreshToken.user }); // Delete token.

        res.status(httpStatus.NO_CONTENT).json({
            success: true,
            message: MESSAGE.logout_successfully,
        });
    }),

    /**
     * POST: Send OTP.
     */
    sendOtp: catchAsync(async (req, res) => {
        const { body } = req,
            // emailExist = await userService.getUserByEmail(body.email); // Get user by email.
            emailExist = await userService.get({ email: body.email, deleted_at: null }); // Get user by email.

        if (!emailExist) {
            throw new ApiError(httpStatus.NOT_FOUND, MESSAGE.email_not_found); // If email doesn't exist, throw an error.
        }

        if (emailExist.is_block) {
            throw new ApiError(httpStatus.UNAUTHORIZED, MESSAGE.account_blocked); // If the user is blocked, throw an error.
        }

        const otp = await tokenService.generateOtpToken(emailExist); // Generate otp.

        // const mailSent = await emailService.sendVerifyEmail({
        //     ...body,
        //     otp,
        //     subject: 'Verify Mail!',
        // }); // Send mail on requested email by users.

        const mailSent = await emailService.sendTemplateEmail({
            to: body.email,
            subject: 'Verify Mail!',
            template: 'otpEmailTemplate', // <---  TEmplate name in Views folder // ✅ Dynamic template name
            data: {
                ...body,
                otp,
            },
        });
        // Send mail on requested email by users.

        if (!mailSent) {
            throw new ApiError(httpStatus.BAD_REQUEST, MESSAGE.something_went_wrong); // If mail doesn't send, throw an error.
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: MESSAGE.otp_sent_email,
        });
    }),

    /**
     * POST: Social login.
     */
    socialLogin: catchAsync(async (req, res) => {
        const { body } = req;
        // let user = await userService.getUserByEmail(body.email); // Get user by email.
        const userRole = await roleService.getRoleByName(ROLES.user); // Get user role ID.
        let user = await userService.get({ email: body.email, deleted_at: null }); // Get user by email.

        /* ------------------------------- //new code ------------------------------- */
        user = !user
            ? await userService.create({
                  first_name: body.first_name,
                  last_name: body.last_name,
                  email: body.email,
                  social_id: body.social_id,
                  social_type: body.social_type,
                  is_email_verified: true,
                  role: userRole._id,
              })
            : await userService.update(
                  { _id: user._id },
                  {
                      $set: {
                          social_id: body.social_id,
                          social_type: body.social_type,
                          is_email_verified: true,
                          role: userRole._id,
                      },
                  }
              );

        const tokens = await tokenService.generateAuthTokens(user); // Generate tokens.

        res.status(httpStatus.OK).json({
            success: true,
            message: MESSAGE.login_successfully,
            data: { user, tokens },
        });
    }),

    /**
     * PUT: Reset password.
     */
    resetPassword: catchAsync(async (req, res) => {
        const { body } = req;

        // const emailExist = await userService.getUserByEmail(body.email); // Get user by email.
        const emailExist = await userService.get({ email: body.email, deleted_at: null }); // Get user by email.

        if (!emailExist) {
            throw new ApiError(httpStatus.NOT_FOUND, MESSAGE.email_not_found); // If email doesn't exist, throw an error.
        }

        if (emailExist.is_block) {
            throw new ApiError(httpStatus.UNAUTHORIZED, MESSAGE.account_blocked); // If the user is blocked, throw an error.
        }
        let token = await tokenService.get({
            type: TOKEN_TYPES.verifyOtp,
            user: emailExist._id,
        }); // Get token by type and user.

        if (!token) {
            throw new ApiError(httpStatus.BAD_REQUEST, MESSAGE.something_went_wrong); // If token doesn't exist, throw an error.
        }

        if (token.token !== body.otp) {
            throw new ApiError(httpStatus.BAD_REQUEST, MESSAGE.otp_invalid); // If otp doesn't match, throw an error.
        }

        const bcryptPassword = await bcrypt.hash(body.password, 8); // New password bcrypt.

        // await userService.updateUserById(emailExist._id, { password: bcryptPassword }); // Update user password by _id.
        await userService.update({ _id: emailExist._id }, { $set: { password: bcryptPassword } }); // Update user password by _id.

        res.status(httpStatus.OK).json({
            success: true,
            message: MESSAGE.password_reset_successfully,
        });
    }),

    /**
     * PUT: Change password.
     */
    changePassword: catchAsync(async (req, res) => {
        const { user, body } = req;

        if (!(await user.isPasswordMatch(body.old_password))) {
            throw new ApiError(httpStatus.UNAUTHORIZED, MESSAGE.password_is_wrong); // If password doesn't match the user's password, throw an error.
        }

        const bcryptPassword = await bcrypt.hash(body.new_password, 8); // New password bcrypt.

        // await userService.updateUserById(user._id, { password: bcryptPassword }); // Update user password by _id.
        await userService.update({ _id: user._id }, { $set: { password: bcryptPassword } }); // Update user password by _id.

        res.status(httpStatus.OK).json({
            success: true,
            message: MESSAGE.password_changed_successfully,
        });
    }),
};

