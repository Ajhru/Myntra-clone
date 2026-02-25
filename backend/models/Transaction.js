const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    paymentMode: {
      type: String,
      enum: ['ONLINE', 'COD', 'REFUND'],
      required: true,
    },
    amount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ['SUCCESS', 'FAILED', 'REFUNDED'],
      default: 'SUCCESS',
    },
    receiptUrl: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Transaction', transactionSchema);