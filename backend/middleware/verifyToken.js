const jwt = require('jsonwebtoken');

// Secret key used to verify the token, from environment variable or default
const APP_SECRET = process.env.APP_SECRET || 'your_app_secret_here';

// Middleware function to protect routes using JWT authentication
module.exports = function (req, res, next) {
  // Get the Authorization header value
  const authHeader = req.headers['authorization'];

  // Extract the token part (after "Bearer")
  const token = authHeader && authHeader.split(' ')[1];

  // If no token is provided, deny access
  if (!token) {
    return res.status(401).json({ message: 'Missing token' });
  }

  // Verify the token using the secret key
  jwt.verify(token, APP_SECRET, (err, decoded) => {
    if (err) {
      // If token is invalid or expired, deny access
      return res.status(403).json({ message: 'Invalid or expired token' });
    }

    // Attach the decoded token (user data) to the request object
    req.user = decoded;

    // Pass control to the next middleware or route handler
    next();
  });
};