const mongoose = require('mongoose'); // Import mongoose
require('dotenv').config(); // Load environment variables from .env file

// Define the MONGODB connection URL
const mongoURL =  process.env.MONGODB_URL;
// const mongoURL = process.env.MONGODB_URL_LOCAL; // Use the MongoDB URL from environment variables

//Set up MongoDB connection
mongoose.connect(mongoURL, { // Connect to MongoDB using the URL
  useNewUrlParser: true, // Use the new URL parser to avoid deprecation warnings
  useUnifiedTopology: true, // Use the new unified topology layer to avoid deprecation warnings
});

// Get the default connection
// Mongoose maintain a default connection object representing the MongoDB connection.
const db = mongoose.connection; 

// Define event listeners for the connection
db.on('connected', () => { 
    console.log('Connected to MongoDB server');
});

db.on('error', (err) => {
    console.error('MongoDB connection error:', err);
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

module.exports = db; // Export the db object for use in other files
