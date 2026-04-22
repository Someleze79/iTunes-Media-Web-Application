const express = require('express');
const axios = require('axios');
// Import the verifyToken middleware to protect this route
const verifyToken = require('../middleware/verifyToken'); // Correct path and style

const router = express.Router();

// GET /api/search?q=eminem&media=music
// This route allows authenticated users to search the iTunes API
router.get('/', verifyToken, async (req, res) => {
  // Extract 'q' (search term) and 'media' (optional media type) from query parameters
  const { q, media } = req.query;

  // Return 400 Bad Request if the search term is missing
  if (!q) {
    return res.status(400).json({ message: 'Search term required' });
  }

  try {
    // Construct the iTunes Search API URL
    // Use encodeURIComponent to safely encode the search term
    // Default 'media' to 'all' if not provided
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(q)}&media=${media || 'all'}&limit=20`;

    // Make a GET request to the iTunes API
    const response = await axios.get(url);

    // Map the API response to only include relevant fields for the frontend
    const results = response.data.results.map(item => ({
      id: item.collectionId || item.trackId,        // Unique identifier for album or track
      albumName: item.collectionName || item.trackName, // Album or track name
      artistName: item.artistName,                   // Artist name
      artwork: item.artworkUrl100,                   // URL to artwork image (100x100)
      releaseDate: item.releaseDate                   // Release date of the media
    }));

    // Send the filtered results back to the client as JSON
    res.json(results);

  } catch (err) {
    // Handle errors, such as network issues or invalid API responses
    res.status(500).json({ message: 'Error fetching from iTunes API' });
  }
});

module.exports = router; // Export the router to be used in the main app