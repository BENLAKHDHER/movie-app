// src/components/MovieList.jsx
import React from 'react';
import MovieCard from './MovieCard';

const MovieList = ({ movies, onDelete }) => {
  return (
    <div className="movie-list">
      {movies.length > 0 ? (
        movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} onDelete={onDelete} />
        ))
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default MovieList;