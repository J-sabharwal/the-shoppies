import React from 'react';
import { Col, Button } from 'reactstrap';
import display from '../display.jpg';


function Movie(props) {
  // console.log(props)
  const nomination = props.nomination;
  // const [ nominated, setNominated ] = useState({
  //   title: null,
  //   poster: null,
  //   year: null,  
  // });

  // const handleSubmit = () => {
  //   setNominated({
  //     id: props.imdbID,
  //     title: props.Title,
  //     poster: props.Poster,
  //     year: props.Year,
  //   });
  // };

  return (
    <div>
      <div className="movie-card">
        {/* <Col xs={6} > */}
          <article className="movie" key={props.imdbID}>
            <img
              className="movie-thumbnail" 
              src={props.Poster !== "N/A" ? props.Poster : display} 
              alt="Movie"
            />
            <div className="movie-info">
              <div className="movie-title">{props.Title}</div>
              <div className="movie-year">{props.Year}</div>
            </div>
            <div>
              <Button 
                className="nominate-btn" 
                color="secondary" 
                style={{
                  borderRadius: "0 0.5rem 0.5rem 0"}
                } 
                onClick={() => nomination(props)} 
                type="submit"
              >
                Nominate
              </Button>
            </div>
          </article>
        {/* </Col> */}
      </div>
    </div>
  );
}

export default Movie;