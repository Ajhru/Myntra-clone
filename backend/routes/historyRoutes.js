const express = require("express");
const router = express.Router();
const BrowsingHistory = require("../models/BrowsingHistory");

// Log product view
router.post("/log", async (req, res) => {
  try {
    const { userId, productId } = req.body;

    await BrowsingHistory.findOneAndUpdate(
      { userId, productId },
      { viewedAt: new Date() },
      { upsert: true }
    );

    res.status(200).json({ message: "History updated" });
  } catch (error) {
    res.status(500).json({ message: "Error logging history" });
  }
});

module.exports = router;