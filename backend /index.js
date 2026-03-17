// server.js
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Serve uploaded images statically
app.use("/uploads", express.static("uploads"));

// -----------------------
// MongoDB Connection
// -----------------------
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error("MongoDB connection error:", err));

// -----------------------
// Product Schema
// -----------------------
const productSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  reward: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  category: { type: String, required: true }
}, { timestamps: true });

const Product = mongoose.model("Product", productSchema);

// -----------------------
// Multer File Upload Config
// -----------------------
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  const allowedTypes = /jpeg|jpg|png|webp/;
  const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = allowedTypes.test(file.mimetype);

  if (extname && mimetype) cb(null, true);
  else cb("Only image files are allowed!");
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
  fileFilter
});

// -----------------------
// Create Product API
// -----------------------
app.post("/api/products/create", upload.single("image"), async (req, res) => {
  try {
    const { name, price, reward, description, category } = req.body;

    // Validate fields
    if (!name || !price || !reward || !description || !category) {
      return res.status(400).json({ error: "All fields are required" });
    }

    if (!req.file) {
      return res.status(400).json({ error: "Product image is required" });
    }

    const newProduct = new Product({
      name,
      price: Number(price),
      reward: Number(reward),
      description,
      image: `/uploads/${req.file.filename}`, // store image path
      category: category.toLowerCase().trim()
    });

    await newProduct.save();

    res.status(201).json({
      message: "Product uploaded successfully",
      product: newProduct
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// -----------------------
// Get Products by Category API
// -----------------------
app.get("/api/products", async (req, res) => {
  try {
    const { category } = req.query;

    const filter = category ? { category: { $regex: new RegExp(category, "i") } } : {};

    const products = await Product.find(filter);

    res.json(products);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Server Error" });
  }
});

// -----------------------
// Start Server
// -----------------------
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));