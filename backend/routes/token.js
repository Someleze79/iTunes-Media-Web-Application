const express = require('express');
const jwt = require('jsonwebtoken');
const router = express.Router();

// Load secret key from environment or use default fallback
const APP_SECRET = process.env.APP_SECRET || 'your_app_secret_here';

// GET /api/token
// Public route to generate and return a new JWT token
router.get('/', (req, res) => {
  // Define the token payload - can include more claims if needed
  const payload = { app: 'itunes-media-search' };

  // Sign the token with secret key, expires in 1 hour
  const token = jwt.sign(payload, APP_SECRET, { expiresIn: '1h' });

  // Return the token to the frontend
  res.json({ token });
});

module.exports = router;