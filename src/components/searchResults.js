import React from "react";
import Movie from "./Movie";

function SearchResults(props) {
  const results = props.data;
  const nominees = props.nominees.movieList;
  const nominateMovie = props.nominateMovie;

  const classes = {
    card: "movie-card",
    thumbnail: "movie-thumbnail",
    info: "movie-info",
  };

  const isNominated = (movieId) => {
    let isANominee = false;

    nominees.forEach((nominee) => {
      if (movieId === nominee.imdbID) {
        isANominee = true;
      }
    });
    return isANominee;
  };

  if (results.error) {
    return (
      <h4 className="results-list">
        {results.error === "Too many results."
          ? `${results.error} Please narrow your search and try again!`
          : `${results.error} Please refine your search and try again!`}
      </h4>
    );
  } else {
    return results.data.map((movie) => {
      const movieId = movie.imdbID;
      const nominated = isNominated(movie.imdbID);

      return (
        <Movie
          key={movieId}
          classes={classes}
          {...movie}
          isNominated={nominated}
          nominateMovie={nominateMovie}
          display="search"
        />
      );
    });
  };
};

export default SearchResults;
