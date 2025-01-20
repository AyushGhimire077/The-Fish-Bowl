const express = require('express');
const Aquarium = require('../models/aquariumSchema');
const multer = require('multer');
const path = require('path');

const aquariumRoute = express.Router();

const storage = multer.diskStorage({
    destination: 'aquariumsUpload/',
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
            cb(new Error('Invalid file type. Only images are allowed.'));
        }
    },
});

aquariumRoute.post('/aquarium', upload.single('image'), async (req, res) => {
    const { name, price, description } = req.body;
    const image = req.file;

    if (!name || !price || !description || !image) {
        return res.status(400).json({ message: "All fields, including image, are required" });
    }

    const aquarium = new Aquarium({
        name,
        price,
        description,
        image: `images/${image.filename}`,
    });

    try {
        await aquarium.save();
        res.status(201).json({ message: "Saved successfully", aquarium });
    } catch (error) {
        console.error("Error while submitting:", error);  // Log the full error
        res.status(500).json({ message: "Error while submitting", error: error.message || error });
    }
});
aquariumRoute.delete('/aquarium/:id', async (req, res) => {
    try {
      const aquariumId = req.params.id;
  
      const aquarium = await Aquarium.findById(aquariumId);
  
      if (!aquarium) {
        return res.status(404).json({ message: 'Aquarium not found' });
      }
      await Aquarium.findByIdAndDelete(aquariumId);
  
      res.status(200).json({ message: 'Aquarium deleted successfully' });
    } catch (error) {
      console.error('Error deleting Aquarium:', error);
      res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = aquariumRoute;
