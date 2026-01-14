const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const searchRoutes = require('./routes/search');
const tokenRoutes = require('./routes/token');

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Route to generate and send token to frontend
app.use('/api/token', tokenRoutes);

// Route for search API
app.use('/api/search', searchRoutes);

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});