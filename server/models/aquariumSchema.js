const mongoose = require('mongoose');

const aquariumSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true }
});

module.exports = mongoose.model('Aquarium', aquariumSchema);
