const express = require('express');
const Transaction = require('../models/Transaction');
const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');

const router = express.Router();

router.get('/pdf/:userId', async (req, res) => {
  const transactions = await Transaction.find({ userId: req.params.userId });

  const doc = new PDFDocument();
  res.setHeader('Content-Type', 'application/pdf');
  doc.pipe(res);

  doc.fontSize(18).text('Transaction History\n\n');

  transactions.forEach(t => {
    doc.fontSize(12).text(
      `Mode: ${t.paymentMode} | Amount: ₹${t.amount} | Status: ${t.status} | Date: ${t.createdAt}`
    );
  });

  doc.end();
});

router.get('/csv/:userId', async (req, res) => {
  const transactions = await Transaction.find({ userId: req.params.userId });

  const parser = new Parser();
  const csv = parser.parse(transactions);

  res.header('Content-Type', 'text/csv');
  res.attachment('transactions.csv');
  return res.send(csv);
});

module.exports = router;