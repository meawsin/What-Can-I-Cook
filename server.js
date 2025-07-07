const express = require('express');
const path = require('path');
const app = express();
const PORT = 3000;

// This tells Express that your 'frontend' folder contains the website files.
app.use(express.static(path.join(__dirname, 'frontend')));

// This allows your server to accept and read JSON data.
app.use(express.json());

// A simple test API route
app.get('/api/test', (req, res) => {
  res.json({ message: 'Hello from the backend! 👋' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});