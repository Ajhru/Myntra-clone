const mongoose = require("mongoose");

const BagItemSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    size: String,
    quantity: Number,

    // NEW FIELD
    status: {
      type: String,
      enum: ["active", "saved"],
      default: "active",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Bag", BagItemSchema);
