import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SearchForm = ({ setResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [mediaType, setMediaType] = useState('all');

  // Fetch token on load
  useEffect(() => {
    const getToken = async () => {
      try {
        const res = await axios.get('/api/token');
        localStorage.setItem('appToken', res.data.token);
      } catch (err) {
        console.error('Failed to fetch token:', err.message);
      }
    };

    getToken();
  }, []);

  // ✅ MUST BE INSIDE COMPONENT
  const handleSearch = async () => {
    try {
      if (!searchTerm.trim()) {
        console.warn('Search term is empty');
        return;
      }

      let token = localStorage.getItem('appToken');

      if (!token) {
        const res = await axios.get('/api/token');
        token = res.data.token;
        localStorage.setItem('appToken', token);
      }

      const response = await axios.get('/api/search', {
        headers: {
          Authorization: `Bearer ${token}`
        },
        params: {
          q: searchTerm,
          media: mediaType !== 'all' ? mediaType : undefined
        }
      });

      if (Array.isArray(response.data)) {
        setResults(response.data);
      } else {
        console.error('Unexpected API response:', response.data);
        setResults([]);
      }

    } catch (error) {
      console.error(
        'Search error:',
        error.response?.data || error.message
      );
      setResults([]);
    }
  };

  return (
    <div>
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search media"
      />

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

      <button onClick={handleSearch}>
        Search
      </button>
    </div>
  );
};

export default SearchForm;