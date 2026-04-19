import React, { useState, useEffect } from 'react';
import axios from 'axios';

/*
===========================================================
SearchForm Component
===========================================================

Purpose:
- Allows user to search iTunes media
- Fetches JWT token from backend
- Sends authenticated requests to protected API routes
===========================================================
*/

const SearchForm = ({ setResults }) => {
  // Store user input (search term)
  const [searchTerm, setSearchTerm] = useState('');

  // Store selected media type
  const [mediaType, setMediaType] = useState('all');

  /*
  ===========================================================
  Fetch JWT Token on Component Mount
  ===========================================================

  - Runs once when component loads
  - Requests token from backend
  - Stores token in localStorage for future API requests
  */
  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await axios.get('/api/token'); // ✅ FIXED (no localhost)

        localStorage.setItem('appToken', res.data.token);
      } catch (err) {
        console.error('Failed to fetch token:', err.message);
      }
    };

    getToken();
  }, []);

  /*
  ===========================================================
  Handle Search Request
  ===========================================================

  - Sends authenticated request to backend
  - Includes JWT token in Authorization header
  - Passes search results to parent component
  */
  const handleSearch = async () => {
    try {
      const token = localStorage.getItem('appToken');

      // Basic safety check
      if (!token) {
        console.warn('No token found. Requesting new token...');
        return;
      }

      const response = await axios.get('/api/search', {
        headers: {
          Authorization: `Bearer ${token}` // Send JWT token
        },
        params: {
          q: searchTerm,
          media: mediaType !== 'all' ? mediaType : undefined
        }
      });

      // Send results to parent component
      setResults(response.data);

    } catch (error) {
      console.error(
        'Search error:',
        error.response?.data || error.message
      );
    }
  };

  return (
    <div>
      {/* Search Input */}
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search media"
      />

      {/* Media Type Dropdown */}
      <select
        value={mediaType}
        onChange={(e) => setMediaType(e.target.value)}
      >
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

      {/* Search Button */}
      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchForm;