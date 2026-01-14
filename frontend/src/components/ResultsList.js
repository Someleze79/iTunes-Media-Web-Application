import React from 'react';

// Functional component that displays a list of search results
function ResultsList({ results, addToFavourites }) {
  return (
    <div className="results">
      {/* Heading for the search results section */}
      <h2>Search Results</h2>

      {/* Grid layout to display result items in a card format */}
      <div className="grid">
        {/* Iterate over the results array and render each item */}
        {results.map(item => (
          <div className="card" key={item.id}>
            {/* Display the item's artwork */}
            <img src={item.artwork} alt={item.albumName} />

            {/* Display the album name */}
            <h4>{item.albumName}</h4>

            {/* Display the artist's name */}
            <p>{item.artistName}</p>

            {/* Display the formatted release date */}
            <small>{new Date(item.releaseDate).toLocaleDateString()}</small>

            {/* Button to add this item to the favourites list */}
            <button onClick={() => addToFavourites(item)}>Add to Favourites</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsList; // Export the component for use in other parts of the application