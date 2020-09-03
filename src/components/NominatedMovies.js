import React from 'react';
import { Button } from 'reactstrap';
import display from '../display.jpg';

function NominatedMovies(props) {
  const movie  = props.data.nomination;
  console.log(props.data.nomination)

  return movie && movie.map(film => {

    return (
      <div> 
        <div className="nomination-card">
          <article className="movie" key={film.imdbID + "n"}>
            <img 
              className="movie-thumbnail" 
              src={film.Poster !== "N/A" ? film.Poster : display} 
              alt="Movie"
            />
            <div className="movie-info nominee">
              <div className="movie-title">{film.Title}</div>
              <div className="movie-year">{film.Year}</div>
            </div>
            <div>
              <Button 
                className="nominate-btn" 
                style={{
                  borderRadius: "0 0.5rem 0.5rem 0", 
                  backgroundColor: "rgb(104, 34, 34)" 
                }} 
                type="submit"
              >
                Remove
              </Button>
            </div>
          </article>
        </div>
      </div>
    )
  })
}

export default NominatedMovies;