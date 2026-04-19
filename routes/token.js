// Import required modules
const express = require('express');
const jwt = require('jsonwebtoken');

// Create router instance
const router = express.Router();

/*
===========================================================
Environment Configuration
===========================================================

- APP_SECRET should be stored securely in environment variables
- NEVER hardcode secrets in production
*/
const APP_SECRET = process.env.APP_SECRET;

if (!APP_SECRET) {
  console.warn('⚠️ WARNING: APP_SECRET is not set in environment variables');
}

/*
===========================================================
GET /api/token
===========================================================

Description:
Public route that generates and returns a JWT token.

Purpose:
- Allows frontend to obtain a token
- Token is required to access protected routes (e.g. /api/search)

Security:
- Token is signed using a secret key
- Expires after 1 hour

Example Response:
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6..."
}
===========================================================
*/
router.get('/', (req, res) => {
  try {
    /*
    -------------------------------------------------------
    Define token payload
    -------------------------------------------------------
    You can include more claims like user ID, roles, etc.
    */
    const payload = {
      app: 'itunes-media-search'
    };

    /*
    -------------------------------------------------------
    Generate JWT token
    -------------------------------------------------------
    Options:
    - expiresIn: token lifetime
    - issuer: identifies who issued the token
    - audience: identifies intended recipient
    */
    const token = jwt.sign(payload, APP_SECRET, {
      expiresIn: '1h',
      issuer: 'itunes-api',
      audience: 'itunes-users'
    });

    /*
    -------------------------------------------------------
    Send token to client
    -------------------------------------------------------
    */
    res.json({ token });

  } catch (err) {
    /*
    -------------------------------------------------------
    Error Handling
    -------------------------------------------------------
    */
    console.error('Token generation error:', err.message);

    res.status(500).json({
      message: 'Failed to generate token',
      error: err.message
    });
  }
});

// Export router
module.exports = router;