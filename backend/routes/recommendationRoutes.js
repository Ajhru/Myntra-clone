const express = require("express");
const router = express.Router();
const Product = require("../models/Product");
const Wishlist = require("../models/Wishlist");
const BrowsingHistory = require("../models/BrowsingHistory");

router.get("/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    const currentProduct = await Product.findById(productId);
    if (!currentProduct)
      return res.status(404).json({ message: "Product not found" });

    // Fetch all products except current
    const products = await Product.find({
      _id: { $ne: productId },
    }).lean();

    // Fetch wishlist
    const wishlist = await Wishlist.findOne({ userId }).populate("productId");

    // Fetch browsing history
    const history = await BrowsingHistory.find({ userId })
      .sort({ viewedAt: -1 })
      .limit(20)
      .populate("productId");

    const now = Date.now();

    const scoredProducts = products.map((p) => {
      let score = 0;

      // Same category
      if (p.category === currentProduct.category) score += 10;

      // Same brand
      if (p.brand === currentProduct.brand) score += 7;

      // Similar price
      const priceDiff = Math.abs(p.price - currentProduct.price);
      if (priceDiff < currentProduct.price * 0.3) score += 4;

      // Wishlist similarity
      if (wishlist) {
        wishlist.productId.forEach((w) => {
          if (w.category === p.category) score += 6;
        });
      }

      // Browsing similarity with recency
      history.forEach((h) => {
        const hoursAgo =
          (now - new Date(h.viewedAt)) / (1000 * 60 * 60);
        const recencyWeight = Math.max(1, 10 - hoursAgo);

        if (h.productId.category === p.category)
          score += 5 * recencyWeight;
      });

      return { ...p, score };
    });

    scoredProducts.sort((a, b) => b.score - a.score);

    res.status(200).json(scoredProducts.slice(0, 10));
  } catch (error) {
    res.status(500).json({ message: "Recommendation error" });
  }
});

module.exports = router;