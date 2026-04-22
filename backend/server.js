const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

const searchRoutes = require('./routes/search');
const tokenRoutes = require('./routes/token');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes (must stay above React static files)
app.use('/api/token', tokenRoutes);
app.use('/api/search', searchRoutes);

// Serve React build files
app.use(express.static(path.join(__dirname, 'build')));

// ✅ Safe React catch-all fallback (FIXED)
app.use((req, res) => {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});