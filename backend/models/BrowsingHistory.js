const mongoose = require("mongoose");

const browsingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    productId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    viewedAt: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// Prevent duplicate entries
browsingSchema.index({ userId: 1, productId: 1 }, { unique: true });

module.exports = mongoose.model("BrowsingHistory", browsingSchema);