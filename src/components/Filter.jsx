// src/components/Filter.jsx
import React from 'react';

const Filter = ({ onFilterChange }) => {
  const handleTitleChange = (e) => {
    onFilterChange({ title: e.target.value });
  };

  const handleRatingChange = (e) => {
    onFilterChange({ rating: e.target.value });
  };

  return (
    <div className="filter">
      <input
        type="text"
        placeholder="Search by title..."
        onChange={handleTitleChange}
      />
      <input
        type="number"
        placeholder="Search by rating..."
        min="0"
        max="5"
        step="0.1"
        onChange={handleRatingChange}
      />
    </div>
  );
};

export default Filter;