import React from 'react';
// import { Col } from 'reactstrap';
import display from '../display.jpg';

function NominatedMovies(props) {
  const movie  = props.data.nomination;
  console.log(props.data.nomination)

  return movie && movie.map(film => {

    return (
      <div> 
        <div className="nomination-card">
          <article className="movie" key={film.imdbID + "n"}>
            <img className="movie-thumbnail" src={film.Poster !== "N/A" ? film.Poster : display} alt="Movie" />
            <div className="movie-info">
              <div className="movie-title">{film.Title}</div>
              <div className="movie-year">{film.Year}</div>
            </div>
          </article>
        </div>
      </div>
    )
  })
}

export default NominatedMovies;