const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const app = express();   // ✅ CREATE APP FIRST

app.use(express.json());
app.use(cors({
  origin: "*",
  credentials: true,
}));

// ✅ ROUTES (AFTER app is created)

const userrouter = require("./routes/Userroutes");
const categoryrouter = require("./routes/Categoryroutes");
const productrouter = require("./routes/Productroutes");
const Bagroutes = require("./routes/Bagroutes");
const Wishlistroutes = require("./routes/Wishlistroutes");
const OrderRoutes = require("./routes/OrderRoutes");

const exportRoutes = require("./routes/exportRoutes");
const historyRoutes = require("./routes/historyRoutes");
const transactionRoutes = require("./routes/transactionRoutes");
const recommendationRoutes = require("./routes/recommendationRoutes");

// ✅ USE ROUTES
app.use("/user", userrouter);
app.use("/category", categoryrouter);
app.use("/product", productrouter);
app.use("/bag", Bagroutes);
app.use("/wishlist", Wishlistroutes);
app.use("/Order", OrderRoutes);

app.use("/api/export", exportRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/transactions", transactionRoutes);
app.use("/api/recommendations", recommendationRoutes);

app.get("/", (req, res) => {
  res.send("✅ Myntra backend is working");
});

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// const PORT = 5000;
const PORT = process.env.PORT || 5000;
 
app.listen(PORT,"0.0.0.0", () => {
  console.log(`Server is running on port ${PORT}`);
});

