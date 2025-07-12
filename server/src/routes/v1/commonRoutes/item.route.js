const express = require('express');
const validate = require('../../../middlewares/validate');
const itemValidation = require('../../../validations/item.validation');
const itemController = require('../../../controllers/commonControllers/item.controller');

const router = express.Router();

/** Get List */
router.get('/list', validate(itemValidation.getList), itemController.getAllItems);

/** Get Details */
router.get('/details/:itemId', validate(itemValidation.getDetails), itemController.getDetails);

module.exports = router;
