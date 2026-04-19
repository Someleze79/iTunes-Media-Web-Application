const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const searchRoutes = require('../routes/search');
const tokenRoutes = require('../routes/token');

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/token', tokenRoutes);
app.use('/api/search', searchRoutes);

// Export the app (NO app.listen)
module.exports = app;