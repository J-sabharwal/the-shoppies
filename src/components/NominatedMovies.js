import React from "react";
import Movie from "./Movie";

function NominatedMovies(props) {
  const deleteMovie = props.deleteMovie;
  const moviesArray = props.data.movieList;

  const classes = {
    card: "nomination-card",
    thumbnail: "movie-thumbnail",
    info: "movie-info"
  }

  return (
    moviesArray &&
    moviesArray.map((movie) => {
      const { imdbID } = movie;

      return (
        <Movie
          key={imdbID}
          {...movie}
          deleteMovie={deleteMovie}
          display="nominate"
          classes={classes}
        />
      );
    })
  );
};

export default NominatedMovies;
