const ApiError = require('../../utils/apiError');
const catchAsync = require('../../utils/catchAsync');
const itemService = require('../../services/item.service');
const fileService = require('../../services/files.service');
const { FILES_FOLDER, ITEM } = require('../../helper/constant.helper');

/** Create */
const createItem = catchAsync(async (req, res) => {
    const {
        user,
        body: { itemId, remove_images, ...body },
        files,
    } = req;

    body.owner = user._id;
    body.status = ITEM.STATUS.pending;

    let resMsg = 'Item created successfully';

    let item;
    if (itemId) {
        item = await itemService.getItemDtl({ _id: itemId });
        if (!item) {
            throw new ApiError(404, 'Item not found');
        }

        resMsg = 'Item updated successfully';
    } else {
        item = await itemService.createItemConstructor(body);
    }

    if (remove_images?.length) {
        fileService.deleteFiles(
            remove_images.map((image) => `./${FILES_FOLDER.clothImages}/${image}`)
        );

        body.images = item.images.filter((image) => !remove_images.includes(image));
    }

    if (files.length) {
        const { name } = await fileService.saveFile({
            file: files,
            folderName: FILES_FOLDER.clothImages,
        });

        body.images = remove_images?.length ? [...body.images, ...name] : [...item.images, ...name];
    }

    Object.assign(item, body);

    // Save item in database.
    await item.save();

    return res.status(200).json({
        success: true,
        message: resMsg,
        data: item,
    });
});

/** Get list */
const getAllItems = catchAsync(async (req, res) => {
    const { user } = req;
    return res.status(200).json({
        success: true,
        data: await itemService.getAllItems({ owner: user._id }),
    });
});

/** Get details */
const getDetails = catchAsync(async (req, res) => {
    const item = await itemService.getItemDtl({ _id: req.params.itemId });
    if (!item) {
        throw new ApiError(404, 'Item not found');
    }

    return res.status(200).json({
        success: true,
        data: item,
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
    createItem,
    getAllItems,
    getDetails,
    deleteItem,
};
