import React from 'react';

// Functional component that displays a list of search results
function ResultsList({ results, addToFavourites }) {

  // 🛑 Prevent crash if results is not an array
  if (!Array.isArray(results)) {
    console.error('Invalid results:', results);
    return <p>No results available</p>;
  }

  // 🛑 Handle empty results
  if (results.length === 0) {
    return <p>No results found</p>;
  }

  return (
    <div className="results">
      <h2>Search Results</h2>

      <div className="grid">
        {results.map(item => (
          <div className="card" key={item.id}>
            <img src={item.artwork} alt={item.albumName} />

            <h4>{item.albumName}</h4>

            <p>{item.artistName}</p>

            <small>
              {item.releaseDate
                ? new Date(item.releaseDate).toLocaleDateString()
                : 'No date available'}
            </small>

            <button onClick={() => addToFavourites(item)}>
              Add to Favourites
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsList;