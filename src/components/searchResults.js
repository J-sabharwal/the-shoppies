import React, { useState } from 'react';
import './searchResults.css';
import Movie from './Movie';

function SearchResults(props) {

  return props.data.data.map(movie => {
    return <Movie key={Movie.id} {...movie} />;
  });
}

export default SearchResults;