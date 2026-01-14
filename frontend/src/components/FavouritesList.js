import React from 'react';

// Functional component that displays a list of favourite items
function FavouritesList({ favourites, removeFromFavourites }) {
  return (
    <div className="favourites">
      {/* Heading for the favourites section */}
      <h2>Favourites</h2>

      {/* Grid layout for displaying each favourite item as a card */}
      <div className="grid">
        {/* Loop through each favourite item and render its details */}
        {favourites.map(item => (
          <div className="card" key={item.id}>
            {/* Display artwork image of the item */}
            <img src={item.artwork} alt={item.albumName} />

            {/* Display album name */}
            <h4>{item.albumName}</h4>

            {/* Display artist name */}
            <p>{item.artistName}</p>

            {/* Button to remove the item from favourites */}
            <button onClick={() => removeFromFavourites(item.id)}>Remove</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FavouritesList; // Export the component so it can be used in other parts of the app