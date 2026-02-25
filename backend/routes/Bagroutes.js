const express = require("express");
const Bag = require("../models/Bag");
const router = express.Router();
const scheduleCartReminder = require('../utils/scheduleNotification');

router.post("/", async (req, res) => {
  if (user.expoPushToken) {
    scheduleCartReminder(user.expoPushToken);
  }
  try {
    const Bags = new Bag(req.body);
    const saveitem = await Bags.save();
    res.status(200).json(saveitem);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.get("/:userid", async (req, res) => {
  try {
    const bag = await Bag.find({ userId: req.params.userid }).populate(
      "productId"
    );
    res.status(200).json(bag);
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

router.delete("/:itemid", async (req, res) => {
  try {
    await Bag.findByIdAndDelete(req.params.itemid);
    res.status(200).json({ message: "Item removed from bag" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Error removing item from bag" });
  }
});
// Move item between active and saved
router.put("/move/:itemid", async (req, res) => {
  try {
    const { status } = req.body; // "active" or "saved"

    const updatedItem = await Bag.findByIdAndUpdate(
      req.params.itemid,
      { status },
      { new: true }
    );

    res.status(200).json(updatedItem);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error updating item status" });
  }
});
module.exports = router;
