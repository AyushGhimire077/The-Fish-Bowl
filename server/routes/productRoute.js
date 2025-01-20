const express = require("express");
const Product = require("../models/productSchema");
const multer = require("multer");
const path = require("path");

const productRoute = express.Router();

const storage = multer.diskStorage({
  destination: "uploads/",
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${Date.now()}${ext}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(ext)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only images are allowed."));
    }
  },
});

productRoute.post("/product", upload.single("image"), async (req, res) => {
  const { name, price, description } = req.body;
  const image = req.file;

  console.log("Received data:", { name, price, description, image });

  if (!name || !price || !description || !image) {
    return res
      .status(400)
      .json({ message: "All fields, including image, are required" });
  }

  const product = new Product({
    name,
    price,
    description,
    image: `images/${image.filename}`,
  });

  try {
    await product.save();
    res.status(201).json({ message: "Saved successfully", product });
  } catch (error) {
    console.error("Error while submitting:", error);
    res.status(500).json({ message: "Error while submitting", error });
  }
});
productRoute.delete('/products/:id', async (req, res) => {
    try {
      const productId = req.params.id;
  
      // Find the product by ID
      const product = await Product.findById(productId);
  
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      // Delete the product
      await Product.findByIdAndDelete(productId);
  
      res.status(200).json({ message: 'Product deleted successfully' });
    } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });

module.exports = productRoute;
