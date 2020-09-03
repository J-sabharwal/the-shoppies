import React from 'react';
import './searchResults.css';
import Movie from './Movie';

function SearchResults(props) {
  const results = props.data;
  const nomination = props.nomination;
  // console.log(props)

  if (results.error) {

    return <h4 className="query">{results.error === "Too many results." ? `${results.error} Please narrow your search and try again!` : `${results.error} Please try another search!`}</h4>;

  } else {

    return results.data.map(movie => {
      return <Movie key={movie.imdbID} {...movie} nomination={nomination} />;
    });
  };
};

export default SearchResults;