const mongoose = require('mongoose');
const { SWAP } = require('../helper/constant.helper');
const { toJSON, paginate } = require('./plugins');

const swapSchema = new mongoose.Schema(
  {
    requester: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    responder: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    // Item requested by requester (always required)
    responderItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      required: true,
    },

    // Item offered by requester (only for direct swaps)
    requesterItem: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Item',
      default: null,
    },

    // Swap type: either item-for-item or point-based
    type: {
      type: String,
      enum: SWAP.TYPE,
      required:true,
    },

    // For point redemption: how many points were used
    pointsUsed: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: SWAP.STATUS,
      default: SWAP.STATUS.pending,
    },
  },
  { 
    timestamps: true,
  }
);

swapSchema.plugin(toJSON);
swapSchema.plugin(paginate);

module.exports = mongoose.model('Swap', swapSchema);
