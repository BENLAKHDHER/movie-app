// src/App.jsx
import React, { useState, useEffect } from 'react';
import MovieList from './components/MovieList';
import Filter from './components/Filter';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const App = () => {
  const [movies, setMovies] = useState([]);
  const [filter, setFilter] = useState({ title: '', rating: '' });

  // Fetch movies automatically from TMDb API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&region=US`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch movies');
        }
        const data = await response.json();

        // Sort movies by release date (most recent first)
        const sortedMovies = data.results.sort((a, b) => {
          return new Date(b.release_date) - new Date(a.release_date);
        });

        const formattedMovies = sortedMovies.map((movie) => ({
          id: movie.id,
          title: movie.title,
          description: movie.overview,
          posterURL: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
          rating: movie.vote_average,
        }));

        setMovies(formattedMovies);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    };

    fetchMovies();
  }, []);

  // Function to add a new movie manually
  const addMovie = (newMovie) => {
    setMovies([...movies, newMovie]);
  };

  // Function to delete a movie
  const deleteMovie = (id) => {
    const updatedMovies = movies.filter((movie) => movie.id !== id);
    setMovies(updatedMovies);
  };

  // Function to handle filter changes
  const handleFilterChange = (newFilter) => {
    setFilter({ ...filter, ...newFilter });
  };

  // Filtered movies based on title and rating
  const filteredMovies = movies.filter(
    (movie) =>
      movie.title.toLowerCase().includes(filter.title.toLowerCase()) &&
      (!filter.rating || movie.rating >= parseFloat(filter.rating))
  );

  return (
    <div className="app">
      <h1>My Movie App</h1>

      {/* Filter Component */}
      <Filter onFilterChange={handleFilterChange} />

      {/* Add Movie Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const title = e.target.title.value;
          const description = e.target.description.value;
          const posterURL = e.target.posterURL.value;
          const rating = parseFloat(e.target.rating.value);

          if (title && description && posterURL && rating) {
            addMovie({
              id: Date.now(), // Generate a unique ID for new movies
              title,
              description,
              posterURL,
              rating,
            });
            e.target.reset();
          }
        }}
      >
        <h2>Add a New Movie</h2>
        <input type="text" name="title" placeholder="Title" required />
        <input type="text" name="description" placeholder="Description" required />
        <input type="url" name="posterURL" placeholder="Poster URL" required />
        <input type="number" name="rating" placeholder="Rating (0-5)" min="0" max="5" required />
        <button type="submit">Add Movie</button>
      </form>

      {/* Movie List */}
      <MovieList movies={filteredMovies} onDelete={deleteMovie} />
    </div>
  );
};

export default App;