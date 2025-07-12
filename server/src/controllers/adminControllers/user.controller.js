const httpStatus = require('http-status');
const { userService, roleService } = require('../../services');
const ApiError = require('../../utils/apiError');
const catchAsync = require('../../utils/catchAsync');
const { str2regex } = require('../../helper/function.helper');
const MESSAGE = require('../../config/message.json');
const { ROLES } = require('../../helper/constant.helper');

/**
 * All users controllers are exported from here 👇
 */
module.exports = {
    /**
     * GET: Get all user.
     */
    getAllUser: catchAsync(async (req, res) => {
        let { search, is_block, ...options } = req.query;
        const userRole = await roleService.getRoleByName(ROLES.user); // Get user role ID.
        const filter = {
            deleted_at: null,
            role: userRole._id, // Filter by user role.
        };

        if (search) {
            search = str2regex(search); // The search string is converted to a regex string.

            filter.$or = [
                { first_name: { $regex: search, $options: 'i' } },
                { last_name: { $regex: search, $options: 'i' } },
            ];
        }

        if (typeof is_block === 'boolean') {
            filter.is_block = is_block;
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: MESSAGE.get_all_user_successfully,
            // data: await userService.paginate(filter, options, {
            //     org: 1,
            //     small: 1,
            // }), // Get users with pagination.,
            // Get users with pagination.,
            data: await userService.getAll(filter, options),
        });
    }),

    /**
     * GET: Get single user.
     */
    getUserById: catchAsync(async (req, res) => {
        // const userExist = await userService.getUserById(req.params.userId);
        const userId = req.params.userId,
            userExist = await userService.get({ _id: userId }); // Get user by _id.

        if (!userExist) {
            throw new ApiError(httpStatus.NOT_FOUND, MESSAGE.user_not_found); // If user doesn't exist, throw an error.
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: MESSAGE.get_user_successfully,
            data: userExist,
        });
    }),

    /**
     * PATCH: Block/Unblock user.
     */
    blockUser: catchAsync(async (req, res) => {
        const userId = req.params.userId,
            userExist = await userService.get({ _id: userId }); // Get user by _id.
        // userExist = await userService.getUserById(userId); // Get user by _id.

        if (!userExist) {
            throw new ApiError(httpStatus.NOT_FOUND, MESSAGE.user_not_found); // If user doesn't exist, throw an error.
        }

        res.status(httpStatus.OK).json({
            success: true,
            message: userExist.is_block
                ? MESSAGE.user_unblocked_successfully
                : MESSAGE.user_blocked_successfully,
            /* -------------------------------- NEw CODE -------------------------------- */
            data: await userService.update(
                { _id: userId },
                { $set: { is_block: userExist.is_block ? false : true } },
                { new: true }
            ), // Update user by _id (block/unBLock).

            /* -------------------------------- OLD CODE -------------------------------- */
            // data: await userService.updateUserById(userId, {
            //     is_block: userExist.is_block ? false : true,
            // }), // Update user by _id (block/unBLock).
        });
    }),

    /**
     * DELETE: Delete user by _id (SOFT DELETE).
     */
    deleteUser: catchAsync(async (req, res) => {
        const userId = req.params.userId,
            userExist = await userService.get({ _id: userId }); // Get user by _id.
        // userExist = await userService.getUserById(userId); // Get user by _id.

        if (!userExist) {
            throw new ApiError(httpStatus.NOT_FOUND, MESSAGE.user_not_found); // If user doesn't exist, throw an error.
        }

        await userService.update({ _id: userId }, { $set: { deleted_at: new Date() } }); // Update user by _id (Delete user).

        res.status(httpStatus.OK).json({
            success: true,
            message: MESSAGE.user_deleted_successfully,
        });
    }),
};
