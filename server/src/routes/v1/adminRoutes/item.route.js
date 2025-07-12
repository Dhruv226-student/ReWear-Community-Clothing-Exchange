const express = require('express');
const validate = require('../../../middlewares/validate');
const itemValidation = require('../../../validations/item.validation');
const itemController = require('../../../controllers/adminControllers/item.controller');
const { auth } = require('../../../middlewares/auth');
const { ROLES } = require('../../../helper/constant.helper');

const router = express.Router();

/** Update */
router.put(
    '/manage-status/:itemId',
    auth(ROLES.admin),
    validate(itemValidation.updateItem),
    itemController.manageItemStatus
);

/** Delete */
router.delete(
    '/delete/:itemId',
    auth(ROLES.admin),
    validate(itemValidation.getDetails),
    itemController.deleteItem
);

module.exports = router;
