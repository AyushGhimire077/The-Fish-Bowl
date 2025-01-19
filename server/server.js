const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const productRoutes = require('./routes/productRoute');
const connectDB = require('./db')

const app = express();

dotenv.config();

connectDB();

// middleware
app.use(cors());
app.use(express.json());

app.use('/api', productRoutes);


const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log('server is running on port', PORT);
});
