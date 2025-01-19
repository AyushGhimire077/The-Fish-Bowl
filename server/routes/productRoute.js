const express = require('express');
const Product = require('../models/productSchema');
const multer = require('multer');
const path = require('path');

const productRoute = express.Router();

const upload = multer({ dest: 'uploads/' });

productRoute.post('/product', upload.single('image'), async (req, res) => {
    const { name, price, description } = req.body;
    const image = req.file;

    console.log('Received data:', { name, price, description, image });

    if (!name || !price || !description || !image) {
        return res.status(400).json({ message: "All fields, including image, are required" });
    }

    const product = new Product({
        name,
        price,
        description,
        image: `/images/${image.filename}`
    });
    console.log('Saving product:', product);


    try {
        await product.save();
        res.status(201).json({ message: "Saved successfully", product });
    } catch (error) {
        console.error('Error while submitting:', error);
        res.status(500).json({ message: "Error while submitting", error });
    }
});

productRoute.use('/images', express.static(path.join(__dirname, '../../uploads')));

module.exports = productRoute;
