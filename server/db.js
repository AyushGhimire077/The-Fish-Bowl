require('dotenv').config();
const mongoose = require('mongoose');

const mongoURI = process.env.MONGO_URL;

const connectDB =()=>{
  try {
    mongoose.connect(mongoURI).then(console.log('Connect to db'))
  } catch (error) {
    console.log('Inter db error',error); 
  }
}

module.exports = connectDB