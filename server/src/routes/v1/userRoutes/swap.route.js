const express = require('express');
const swapController = require('../../../controllers/userControllers/swap.controller');
const { auth } = require('../../../middlewares/auth');
const { ROLES } = require('../../../helper/constant.helper');
const validate = require('../../../middlewares/validate');
const swapValidation = require('../../../validations/swap.validation');

const router = express.Router();

router.post(
    '/create',
    auth(ROLES.user),
    validate(swapValidation.createSwap),
    swapController.createSwapRequest
); // Create Swap / Points Redeem
router.get('/list', auth(ROLES.user), swapController.listUserSwaps); // Get My Swaps
router.get('/:swapId', auth(ROLES.user), swapController.getSwap); // Get Single Swap
// router.patch('/:swapId/status', auth(ROLES.user), swapController.updateSwapStatus); // Accept / Reject / Cancel
router.put('/status/:swapId',auth(ROLES.user),
validate(swapValidation.statuUpdate)
,swapController.statusUpdate)
module.exports = router;
