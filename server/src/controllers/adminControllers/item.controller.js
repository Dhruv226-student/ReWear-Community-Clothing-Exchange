const ApiError = require('../../utils/apiError');
const catchAsync = require('../../utils/catchAsync');
const itemService = require('../../services/item.service');
const fileService = require('../../services/files.service');
const userService = require('../../services/user.service');
const { FILES_FOLDER, ITEM } = require('../../helper/constant.helper');
const { str2regex } = require('../../helper/function.helper');

/** Get list */
const getAllItems = catchAsync(async (req, res) => {
    const {
        query: { search, ...options },
    } = req;

    let filter = {
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

/** Update */
const manageItemStatus = catchAsync(async (req, res) => {
    const { params, body } = req;

    let itemDtl = await itemService.getItemDtl({ _id: req.params.itemId });
    if (!itemDtl) {
        throw new ApiError(404, 'Item not found');
    }

    if (body.status === ITEM.STATUS.approved && itemDtl.first_approval) {
        await userService.update({ _id: itemDtl.owner }, { $inc: { points: 10 } });

        body.first_approval = false;
    }

    itemDtl = await itemService.updateItem({ _id: params.itemId }, { $set: body }, { new: true });

    return res.status(200).json({
        success: true,
        message: body.status,
        data: itemDtl,
    });
});

/** Delete */
const deleteItem = catchAsync(async (req, res) => {
    const { params } = req;

    const deleteItem = await itemService.deleteItem({ _id: params.itemId });
    if (!deleteItem) {
        throw new ApiError(404, 'Item not found');
    }

    // Delete files
    fileService.deleteFiles(
        deleteItem.items.map((image) => `./${FILES_FOLDER.clothImages}/${image}`)
    );

    return res.status(200).json({
        success: true,
        data: deleteItem,
    });
});

module.exports = {
    getAllItems,
    getDetails,
    manageItemStatus,
    deleteItem,
};
