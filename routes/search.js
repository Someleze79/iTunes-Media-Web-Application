// Import required modules
const express = require('express');        // Express framework for building APIs
const axios = require('axios');            // Axios for making HTTP requests to external APIs

// Import custom middleware to protect this route (JWT authentication)
const verifyToken = require('../middleware/verifyToken');

// Create a new router instance
const router = express.Router();

/*
===========================================================
GET /api/search
===========================================================

Description:
This route allows authenticated users to search for media
using the iTunes Search API.

Query Parameters:
- q (required): Search term (e.g., artist name, song, album)
- media (optional): Type of media (music, movie, podcast, etc.)
  Defaults to 'all' if not provided

Example:
GET /api/search?q=eminem&media=music

Security:
- Protected using verifyToken middleware
- Only users with a valid JWT can access this route
===========================================================
*/
router.get('/', verifyToken, async (req, res) => {
  
  // Extract query parameters from the request
  const { q, media } = req.query;

  // Validate that a search term is provided
  if (!q) {
    return res.status(400).json({
      message: 'Search term (q) is required'
    });
  }

  try {
    /*
    -------------------------------------------------------
    Construct iTunes API URL
    -------------------------------------------------------
    - encodeURIComponent ensures safe URL formatting
    - media defaults to 'all' if not provided
    - limit=20 restricts results to improve performance
    */
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=${media || 'all'}&limit=20`;

    /*
    -------------------------------------------------------
    Make API request to iTunes
    -------------------------------------------------------
    - timeout prevents hanging requests in serverless environments
    */
    const response = await axios.get(url, { timeout: 5000 });

    /*
    -------------------------------------------------------
    Transform API response
    -------------------------------------------------------
    We only return the fields needed by the frontend.
    This reduces payload size and improves performance.
    */
    const results = response.data.results.map(item => ({
      // Use available ID or fallback to a random value (edge case safety)
      id: item.collectionId || item.trackId || Math.random(),

      // Use album name or fallback to track name
      albumName: item.collectionName || item.trackName,

      // Artist name
      artistName: item.artistName,

      // Artwork image (100x100 resolution)
      artwork: item.artworkUrl100,

      // Release date
      releaseDate: item.releaseDate
    }));

    /*
    -------------------------------------------------------
    Send successful response
    -------------------------------------------------------
    Return filtered results as JSON
    */
    res.json(results);

  } catch (err) {
    /*
    -------------------------------------------------------
    Error Handling
    -------------------------------------------------------
    - Logs error for debugging (important in production)
    - Sends safe error response to client
    */
    console.error('iTunes API Error:', err.message);

    res.status(500).json({
      message: 'Failed to fetch data from iTunes API',
      error: err.message
    });
  }
});

// Export the router so it can be used in the main server file
module.exports = router;