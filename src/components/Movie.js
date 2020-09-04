import React from "react";
import { Button } from "reactstrap";
import display from "../display.jpg";

function Movie(props) {
  const { imdbID, Poster, Title, Year } = props;
  const nominateMovie = props.toNominate;
  const isNominated = props.isNominated;

  return (
    <div>
      <div className="movie-card">
        <article className="movie" key={imdbID}>
          <img
            className="movie-thumbnail"
            src={Poster !== "N/A" ? Poster : display}
            alt="Movie"
          />
          <div className="movie-info">
            <div className="movie-title">{Title}</div>
            <div className="movie-year">{Year}</div>
          </div>
          <div>
            <Button
              className="nominate-btn"
              color="secondary"
              style={{
                borderRadius: "0 0.5rem 0.5rem 0",
                fontSize: "70%",
                height: "100%",
              }}
              onClick={() => nominateMovie(props)}
              disabled={isNominated ? true : false}
              type="submit"
            >
              Nominate
            </Button>
          </div>
        </article>
      </div>
    </div>
  );
};

export default Movie;
