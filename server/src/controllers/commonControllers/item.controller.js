const ApiError = require('../../utils/apiError');
const catchAsync = require('../../utils/catchAsync');
const itemService = require('../../services/item.service');
const { str2regex } = require('../../helper/function.helper');
const { ITEM } = require('../../helper/constant.helper');

/** Get list */
const getAllItems = catchAsync(async (req, res) => {
    const {
        user,
        query: { search, ...options },
    } = req;

    let filter = {
        ...(user ? { owner: { $ne: user._id } } : {}),
        status: ITEM.STATUS.approved,
    };

    if (search) {
        filter.title = { $regex: str2regex(search), $options: 'i' };
    }

    options.populate = {
        path: 'owner',
        select: ['first_name', 'last_name'],
    };

    return res.status(200).json({
        success: true,
        data: await itemService.getAllItemsWithPagination(filter, options),
    });
});

/** Get details */
const getDetails = catchAsync(async (req, res) => {
    const item = await itemService.getItemDtl(
        { _id: req.params.itemId },
        {},
        {
            populate: {
                path: 'owner',
                select: ['first_name', 'last_name'],
            },
        }
    );
    if (!item) {
        throw new ApiError(404, 'Item not found');
    }

    return res.status(200).json({
        success: true,
        data: item,
    });
});

module.exports = {
    getAllItems,
    getDetails,
};
