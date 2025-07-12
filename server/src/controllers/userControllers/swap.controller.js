const httpStatus = require('http-status');
const catchAsync = require('../../utils/catchAsync');
const swapService = require('../../services/swap.service');
const itemService = require('../../services/item.service');
const ApiError = require('../../utils/apiError');
const MESSAGE = require('../../config/message');
const { ITEM, SWAP } = require('../../helper/constant.helper');
const { userService } = require('../../services');
const { handlePointSwap } = require('../../helper/function.helper');

/**
 * Create a swap request (Direct Swap).
 */
exports.createSwapRequest = catchAsync(async (req, res) => {
  const { requesterItem, responderItem, type } = req.body;
  const requester = req.user;
  // Get responder's item 
  const responseItem = await itemService.getItemDtl({ _id: responderItem, status: ITEM.STATUS.approved });
  if (!responseItem) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Responder item not found or not available.');
  }

  let requestItem = null;

  if (type === SWAP.TYPE.swap) {
    // Validate requesterItem
    if (!requesterItem) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'requesterItem is required for item-based swap.');
    }

    requestItem = await itemService.getItemDtl({
      _id: requesterItem,
      owner: requester._id,
      status: ITEM.STATUS.approved,
    });

    if (!requestItem) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Your item is not valid or not available.');
    }

    if (requestItem.owner.toString() === responseItem.owner.toString()) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'You cannot swap with your own item.');
    }
  } else if (type === SWAP.TYPE.redeem) {
    // Check if user has enough points
    const userPoints = req.user.points || 0;
    if (userPoints < responseItem.exchange_points) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Insufficient points to swap for this item.');
    }
  } else {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid swap type.');
  }

  // Create swap request
  const swap = await swapService.create({
    requester: requester?._id,
    responder: responseItem.owner,
    requesterItem: requesterItem || null,
    responderItem,
    type,
    status: 'Pending',
  });

  // Create item history log
  const historyLog = {
    action: 'swap-request',
    swapId: swap._id,
    type,
    by: requester?._id,
    at: new Date(),
  };

  await itemService.updateItem({ _id: responderItem }, { $push: { history: historyLog } });
  if (requesterItem) {
    await itemService.updateItem({ _id: requesterItem }, { $push: { history: historyLog } });
  }

  res.status(httpStatus.CREATED).json({
    success: true,
    message: 'Swap request created successfully.',
    data: swap,
  });
});



/**
 * Accept or update swap status
 */
exports.statusUpdate = catchAsync(async (req, res) => {
  const { swapId } = req.params;
  const { status } = req.body;
  const userId = req.user._id;

  // Get the swap
  const swap = await swapService.get({ _id: swapId });
  if (!swap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Swap not found.');
  }

  // Only responder can accept/update
  if (swap.responder.toString() !== userId.toString()) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Only the responder can update the swap.');
  }

  if (swap.status !== SWAP.STATUS.pending) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Swap is not pending.');
  }

  // Get responder item (for both swap & redeem)
  const responderItem = await itemService.getItemDtl({ _id: swap.responderItem });
  if (!responderItem) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Responder item not found.');
  }
// console.log('============responderItem==========>', responderItem);
  // Handle redeem logic
  if (status === SWAP.STATUS.accepted && swap.type === SWAP.TYPE.redeem) {
    const pointsRequired = responderItem.exchange_points || 0;

    // Get requester (point payer)
    const requester = await userService.get({ _id: swap.requester });
    if (!requester || (requester.points || 0) < pointsRequired) {
      throw new ApiError(httpStatus.BAD_REQUEST, 'Requester has insufficient points.');
    }

    // Deduct from requester, add to responder
    await userService.update(
      { _id: swap.requester },
      { $inc: { points: -pointsRequired } }
    );

    await userService.update(
      { _id: swap.responder },
      { $inc: { points: pointsRequired } }
    );
  }

  // Update item status
  if (status === SWAP.STATUS.accepted) {
    await itemService.updateItem({ _id: swap.responderItem }, { status: ITEM.STATUS.swapped });

    if (swap.type === SWAP.TYPE.swap && swap.requesterItem) {
      await itemService.updateItem({ _id: swap.requesterItem }, { status: ITEM.STATUS.swapped });
    }
  }

  // Update swap status
  const updatedSwap = await swapService.update({ _id: swapId }, { status }, { new: true });

  res.status(httpStatus.OK).json({
    success: true,
    message: 'Swap status updated successfully.',
    data: updatedSwap,
  });
});

/**
 * Get a single swap (auth check).
 */
exports.getSwap = catchAsync(async (req, res) => {
  const { swapId } = req.params;
  const userId = req.user._id;

  const swap = await swapService.get({ _id: swapId });

  if (!swap) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Swap not found.');
  }

  if (
    swap.requester.toString() !== userId.toString() &&
    swap.responder.toString() !== userId.toString()
  ) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Access denied to this swap.');
  }

  res.status(httpStatus.OK).json({
    success: true,
    data: swap,
  });
});

/**
 * List all swaps (user dashboard).
 */
exports.listUserSwaps = catchAsync(async (req, res) => {
  const userId = req.user._id;

  const { page = 1, limit = 10 } = req.query;

  const options = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort: { createdAt: -1 },
    populate: [
      {
        path: 'requesterItem',
        // select: 'name image points status',
      },
      {
        path: 'responderItem',
        // select: 'name image points status',
      },
      {
        path: 'requester',
        select: 'name email',
      },
      {
        path: 'responder',
        select: 'name email',
      },
    ],
  };

  const swaps = await swapService.paginate(
    {
      $or: [{ requester: userId }, { responder: userId }],
    },
    options
  );

  res.status(httpStatus.OK).json({
    success: true,
    data: swaps,
  });
});



