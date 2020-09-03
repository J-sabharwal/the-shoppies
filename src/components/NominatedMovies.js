import React from "react";
import { Button } from "reactstrap";
import display from "../display.jpg";

function NominatedMovies(props) {
  const moviesArray = props.data.movieList;

  return (
    moviesArray &&
    moviesArray.map((movie) => {
      const { imdbID, Poster, Title, Year } = movie;

      return (
        <div key={imdbID}>
          <div className="nomination-card">
            <article className="movie">
              <img
                className="movie-thumbnail"
                src={Poster !== "N/A" ? Poster : display}
                alt="Movie"
              />
              <div className="movie-info nominee">
                <div className="movie-title">{Title}</div>
                <div className="movie-year">{Year}</div>
              </div>
              <div>
                <Button
                  className="nominate-btn"
                  style={{
                    borderRadius: "0 0.5rem 0.5rem 0",
                    backgroundColor: "rgb(104, 34, 34)",
                  }}
                  type="submit"
                >
                  Remove
                </Button>
              </div>
            </article>
          </div>
        </div>
      );
    })
  );
};

export default NominatedMovies;
