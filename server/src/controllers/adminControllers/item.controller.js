const ApiError = require('../../utils/apiError');
const catchAsync = require('../../utils/catchAsync');
const itemService = require('../../services/item.service');
const fileService = require('../../services/files.service');
const { FILES_FOLDER } = require('../../helper/constant.helper');

/** Update */
const manageItemStatus = catchAsync(async (req, res) => {
    const { params, body } = req;

    const updatedItem = await itemService.updateItem({ _id: params.itemId }, { $set: body });
    if (!updatedItem) {
        throw new ApiError(404, 'Item not found');
    }

    return res.status(200).json({
        success: true,
        message: body.status,
        data: updatedItem,
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
    manageItemStatus,
    deleteItem,
};
