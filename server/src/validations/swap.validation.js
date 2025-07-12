const Joi = require('joi');
const { objectId } = require('./custom.validation');
const { SWAP } = require('../helper/constant.helper');

module.exports = {
  createSwap: {
    body: Joi.object().keys({
      requesterItem: Joi.string().custom(objectId).optional().allow('',null),
      responderItem: Joi.string().custom(objectId).required(),
    type: Joi.string().valid(...Object.values(SWAP.TYPE)).required()// Corrected
    }),
  },

  statuUpdate:{
    param:{
        swapId: Joi.string().custom(objectId).required(),
    },
    body:{
        status: Joi.string().valid(...Object.values(SWAP.STATUS)).required()
    }
  }
};
