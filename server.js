// Import necessary packages
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const recipeRoutes = require('./routes/recipeRoutes'); // Import recipe routes

// Initialize the app
const app = express();
const PORT = process.env.PORT || 3000;

// --- Middleware ---
app.use(express.static(path.join(__dirname, 'frontend')));
app.use(express.json());

// --- Database Connection ---
const mongoURI = process.env.MONGO_URI;
if (!mongoURI) {
  console.error('FATAL ERROR: MONGO_URI is not defined in your .env file.');
  process.exit(1);
}
mongoose.connect(mongoURI)
  .then(() => console.log('Successfully connected to MongoDB Atlas!'))
  .catch(err => console.error('Error connecting to MongoDB:', err));

// --- API Routes ---
app.use('/api/users', userRoutes);
app.use('/api/recipes', recipeRoutes); // Tell the server to use your recipe routes

app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend! 👋' });
});

// --- Start the Server ---
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
