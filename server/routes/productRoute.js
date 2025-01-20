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

module.exports = productRoute;
