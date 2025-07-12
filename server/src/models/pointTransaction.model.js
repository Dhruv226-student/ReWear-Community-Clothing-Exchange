const mongoose = require('mongoose');

const pointTransactionSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    type: {
      type: String,
      enum: ['credit', 'debit'],
      required: true,
    },
    points: {
      type: Number,
      required: true,
      min: 1,
    },
    description: {
      type: String,
    },
    relatedSwap: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Swap',
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('PointTransaction', pointTransactionSchema);
