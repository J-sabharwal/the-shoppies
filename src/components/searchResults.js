import React, { useState } from 'react';
import './searchResults.css';
import Movie from './Movie';

function SearchResults(props) {

  if (props.data.data !== undefined) {
    console.log(props.data)

  return props.data.data.map(movie => {
    return <Movie key={Movie.id} {...movie} />;
  });

  } else {
    return <h3 className="query">{`No results found`}</h3>;
  }
}

export default SearchResults;