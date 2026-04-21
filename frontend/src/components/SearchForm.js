const handleSearch = async () => {
  try {
    let token = localStorage.getItem('appToken');

    // 🔥 If no token, fetch a new one
    if (!token) {
      console.warn('No token found. Fetching new token...');
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

    // 🔥 Prevent crashes (VERY IMPORTANT)
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

    // 🔥 Optional: reset results to avoid crash
    setResults([]);
  }
};