import React, { useState } from 'react';

// Import child components
import SearchForm from './components/SearchForm';
import ResultsList from './components/ResultsList';
import FavouritesList from './components/FavouritesList';

import './App.css'; // Import styles

function App() {
  // State to store search results from the API
  const [results, setResults] = useState([]);

  // State to store the user's list of favourite items
  const [favourites, setFavourites] = useState([]);

  // Function to add an item to favourites if it's not already in the list
  const addToFavourites = (item) => {
    if (!favourites.some(fav => fav.id === item.id)) {
      setFavourites([...favourites, item]);
    }
  };

  // Function to remove an item from the favourites list by its ID
  const removeFromFavourites = (id) => {
    setFavourites(favourites.filter(item => item.id !== id));
  };

  return (
    <div className="App">
      {/* Main heading of the application */}
      <h1>iTunes Media Search</h1>

      {/* Search form component — user types search terms and results are set */}
      <SearchForm setResults={setResults} />

      {/* Display the search results with the ability to add to favourites */}
      <ResultsList results={results} addToFavourites={addToFavourites} />

      {/* Display the list of favourite items with option to remove */}
      <FavouritesList favourites={favourites} removeFromFavourites={removeFromFavourites} />
    </div>
  );
}

export default App; // Export the main App component