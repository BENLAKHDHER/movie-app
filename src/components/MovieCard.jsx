// src/components/MovieCard.jsx
import React from 'react';

const MovieCard = ({ movie, onDelete }) => {
  const tmdbLink = `https://www.themoviedb.org/movie/${movie.id}`; // Link to TMDb

  // Handle Delete with Confirmation
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      onDelete(movie.id); // Call the onDelete function passed from the parent
    }
  };

  return (
    <div className="movie-card">
      <a href={tmdbLink} target="_blank" rel="noopener noreferrer">
        <img src={movie.posterURL} alt={movie.title} className="movie-poster" />
      </a>
      <h3 className="movie-title">{movie.title}</h3>
      <p className="movie-description">{movie.description}</p>
      <p className="movie-rating">Rating: {movie.rating}/5</p>
      <button className="delete-button" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default MovieCard;