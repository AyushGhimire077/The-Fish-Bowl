const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoute');
const aquariumRoute = require('./routes/aquariumRoute');
const connectDB = require('./db')
const Aquarium = require('./models/aquariumSchema'); 
const Product = require('./models/productSchema');

const app = express();

dotenv.config();

connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.use('/api', productRoutes);
app.use('/api', aquariumRoute);


const PORT = process.env.PORT || 4000;


//endpoints
app.get('/api/aquarium', async (req, res) => {
    try {
      const items = await Aquarium.find();
      res.json(items);
      console.error('Error fetching items:', error);
    } catch (error) {
      res.status(500).json({ message: 'Error fetching items', error });
    }
  });
  
  app.get('/api/products', async (req, res) => {
    try {
      const items = await Product.find({}); 
      res.json(items);
    } catch (error) {
      console.error('Error fetching items:', error);
      res.status(500).json({ message: 'Error fetching items', error: error.message });
    }
  });
  
  

app.listen(PORT, () => {
    console.log('server is running on port', PORT);
});
