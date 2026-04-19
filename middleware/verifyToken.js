// Import JWT library
const jwt = require('jsonwebtoken');

/*
===========================================================
Environment Configuration
===========================================================

- APP_SECRET must be set in environment variables (Vercel)
- Never rely on a default secret in production
*/
const APP_SECRET = process.env.APP_SECRET;

if (!APP_SECRET) {
  console.warn('⚠️ WARNING: APP_SECRET is not set. Authentication may fail.');
}

/*
===========================================================
JWT Authentication Middleware
===========================================================

Purpose:
- Protect routes by verifying JWT tokens
- Ensures only authenticated users can access certain endpoints

Usage:
- Applied to routes like: router.get('/', verifyToken, handler)

Expected Header Format:
Authorization: Bearer <token>
===========================================================
*/
module.exports = function (req, res, next) {
  try {
    /*
    -------------------------------------------------------
    Extract Authorization header
    -------------------------------------------------------
    */
    const authHeader = req.headers['authorization'];

    // Check if header exists and starts with "Bearer"
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        message: 'Authorization header missing or malformed'
      });
    }

    /*
    -------------------------------------------------------
    Extract token from header
    -------------------------------------------------------
    */
    const token = authHeader.split(' ')[1];

    /*
    -------------------------------------------------------
    Verify JWT token
    -------------------------------------------------------
    */
    jwt.verify(
      token,
      APP_SECRET,
      {
        issuer: 'itunes-api',
        audience: 'itunes-users'
      },
      (err, decoded) => {
        if (err) {
          /*
          ---------------------------------------------------
          Token Errors
          ---------------------------------------------------
          */
          console.error('JWT Verification Error:', err.message);

          return res.status(403).json({
            message: 'Invalid or expired token',
            error: err.message
          });
        }

        /*
        -------------------------------------------------------
        Attach decoded payload to request
        -------------------------------------------------------
        */
        req.user = decoded;

        /*
        -------------------------------------------------------
        Continue to next middleware/route
        -------------------------------------------------------
        */
        next();
      }
    );

  } catch (error) {
    /*
    -------------------------------------------------------
    Unexpected Errors
    -------------------------------------------------------
    */
    console.error('Auth Middleware Error:', error.message);

    res.status(500).json({
      message: 'Authentication error',
      error: error.message
    });
  }
};