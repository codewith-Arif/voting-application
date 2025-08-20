const express = require('express') // Importing express framework to create a web server
const app = express() // Creating an instance of an Express application
const db = require('./db');
require('dotenv').config();

const bodyParser = require('body-parser') // Importing body-parser to parse incoming request bodies
app.use(bodyParser.json()) // req. body // Using body-parser middleware to parse JSON bodies
const PORT = process.env.PORT || 3000 // Setting the port to listen on, defaulting to 3000

// Import the router files
const userRoutes = require('./routes/userRoutes');
const candidateRoutes = require('./routes/candidateRoutes');

// Use the routers
app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

app.listen(PORT, () => { // Starting the server and listening on the specified port
  console.log(`Server is running on port ${PORT}`) // Logging a message to the
});

