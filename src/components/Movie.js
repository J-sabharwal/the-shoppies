import React from "react";
import { Col, Button } from 'reactstrap';
import display from '../display.jpg'

function Movie(props) {

  console.log(props)
  return (
    <div>
      <div className="movie-card">
        <Col xs={6} >
          <article className="movie">
            <img className="movie-thumbnail" src={props.Poster !== "N/A" ? props.Poster : display} alt="Movie" />
            <div className="movie-info">
              <div className="movie-title">{props.Title}</div>
              <div className="movie-year">{props.Year}</div>
            </div>
          </article>
        </Col>
      </div>
      <div className="movie-card">
        <Col xs={6} >
          <article className="movie-nomination">
            {/* <img className="movie-thumbnail" src={props.Poster} alt="Movie" />
            <div className={props.id}>
              <div className="movie-title">{props.Title}</div>
              <div className="movie-year">{props.Year}</div>
            </div> */}
          </article>
        </Col>
      </div>
    </div>
  );
}

export default Movie;