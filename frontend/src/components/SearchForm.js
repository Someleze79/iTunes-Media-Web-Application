import React, { useState, useEffect } from 'react';
import axios from 'axios';

// SearchForm component accepts setResults from parent App component
const SearchForm = ({ setResults }) => {
  // State to store user's search input
  const [searchTerm, setSearchTerm] = useState('');

  // State to store selected media type (e.g., music, movie, etc.)
  const [mediaType, setMediaType] = useState('all');

  // useEffect runs once on component mount to fetch JWT token from backend
  useEffect(() => {
    const getToken = async () => {
      try {
        // Request a JWT token from the backend
        const res = await axios.get('http://localhost:5000/api/token');

        // Store the token in localStorage for use in API requests
        localStorage.setItem('appToken', res.data.token);
      } catch (err) {
        console.error('Failed to fetch token:', err);
      }
    };

    // Call the function to get the token
    getToken();
  }, []);

  // Function that handles performing a search request
  const handleSearch = async () => {
    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem('appToken');

      // Make a GET request to the backend API to search iTunes
      const response = await axios.get('http://localhost:5000/api/search', {
        headers: {
          Authorization: `Bearer ${token}` // Send token in headers
        },
        params: {
          q: searchTerm, // Send the search term
          media: mediaType !== 'all' ? mediaType : undefined // Conditionally send media type
        }
      });

      // Pass the results back up to the App component via the setResults prop
      setResults(response.data);
    } catch (error) {
      console.error('Search error:', error.response?.data || error.message);
    }
  };

  return (
    <div>
      {/* Input for user to type search terms */}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search media"
      />

      {/* Dropdown for selecting media type */}
      <select value={mediaType} onChange={(e) => setMediaType(e.target.value)}>
        <option value="all">All</option>
        <option value="music">Music</option>
        <option value="movie">Movie</option>
        <option value="podcast">Podcast</option>
        <option value="audiobook">Audiobook</option>
        <option value="musicVideo">Music Video</option>
        <option value="shortFilm">Short Film</option>
        <option value="tvShow">TV Show</option>
        <option value="software">Software</option>
        <option value="ebook">eBook</option>
      </select>

      {/* Button to trigger the search */}
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchForm; // Export the component so it can be used in App