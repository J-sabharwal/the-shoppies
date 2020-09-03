import React from "react";
import "./searchResults.css";
import Movie from "./Movie";

function SearchResults(props) {
  const results = props.data;
  const nominationFunction = props.nominateMovie;
  const nominees = props.contender.movieList;

  const isNominated = (movieId) => {
    let isANominee = false;

    nominees.forEach((nominee) => {
      if (movieId === nominee.imdbID) {
        isANominee = true;
      } else {
        return isANominee;
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
          {...movie}
          isNominated={nominated}
          toNominate={nominationFunction}
        />
      );
    });
  };
};

export default SearchResults;
