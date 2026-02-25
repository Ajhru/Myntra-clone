const express = require('express');
const Transaction = require('../models/Transaction');
const router = express.Router();

/**
 * GET user transactions
 * Filters: type, startDate, endDate
 */
router.get('/:userId', async (req, res) => {
  const { type, startDate, endDate } = req.query;

  let filter = { userId: req.params.userId };

  if (type) filter.paymentMode = type;
  if (startDate && endDate) {
    filter.createdAt = {
      $gte: new Date(startDate),
      $lte: new Date(endDate),
    };
  }

  const transactions = await Transaction.find(filter).sort({
    createdAt: -1,
  });

  res.json(transactions);
});

module.exports = router;