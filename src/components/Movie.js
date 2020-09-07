import React from "react";
import { Button } from "reactstrap";
import display from "../display.jpg";

function Movie(props) {
  const { imdbID, Poster, Title, Year } = props;
  const movie = {imdbID, Poster, Title, Year};
  const nominateMovie = props.nominateMovie;
  const isNominated = props.isNominated;
  const displayType = props.display;
  const deleteMovie = props.deleteMovie;
  const classes = props.classes;

  const movieURL = (id) => {
    return window.open(`https://www.imdb.com/title/${imdbID}`, "_blank");
  };

  return (
    <div>
      <div className={classes.card}>
        <article className="movie" key={imdbID}>
          <img
            className={classes.thumbnail}
            src={Poster !== "N/A" ? Poster : display}
            alt="Movie poster"
          />
          <div className={classes.info}>
            <div className="movie-title">{Title}</div>
            <div className="movie-year">{Year}</div>
          </div>
          {displayType === "search" ? (
            <>
              <div>
                <Button
                  className="more-details"
                  size="sm"
                  style={{
                    borderRadius: "0 0 0 0",
                    border: "#ccae63",
                    backgroundColor: "#DAA520",
                    fontSize: "70%",
                    height: "100%",
                  }}
                  onClick={movieURL}
                  type="submit"
                ></Button>
              </div>
              <div>
                <Button
                  className="nominate-btn"
                  color="secondary"
                  size="sm"
                  style={{
                    borderRadius: "0 0.5rem 0.5rem 0",
                    fontSize: "70%",
                    height: "100%",
                  }}
                  onClick={() => nominateMovie(movie)}
                  disabled={isNominated ? true : false}
                  type="submit"
                >
                  Nominate
                </Button>
              </div>
            </>
          ) : (
            <div>
              <Button
                className="nominate-btn"
                style={{
                  borderRadius: "0 0.5rem 0.5rem 0",
                  backgroundColor: "rgba(182, 21, 64, 0.4)",
                  border: "rgba(182, 21, 64, 0.4)",
                  fontSize: "80%",
                  height: "100%",
                }}
                onClick={() => deleteMovie(imdbID)}
                type="submit"
              >
                Remove
              </Button>
            </div>
          )}
        </article>
      </div>
    </div>
  );
};

export default Movie;
