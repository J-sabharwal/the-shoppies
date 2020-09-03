import React, { useState } from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import SearchBar from "./components/searchBar";
import SearchResults from "./components/searchResults";
import NominatedMovies from "./components/NominatedMovies";
import { Col, Row } from "reactstrap";

function App() {
  const [data, setData] = useState({
    data: [],
    page: 1,
    totalPages: 0,
    type: "movie",
    error: null,
    response: false,
  });

  const [nominated, setNominated] = useState({
    movieList: [],
    count: 0,
    max: false,
  });

  const searchQuery = (searchText) => {
    const url = `http://www.omdbapi.com/?apikey=ad24814f&s=${searchText}&type=${data.type}&page=${data.page}`;

    async function fetchData() {
      axios.get(url).then((response) => {
        const responseData = response.data;
        const requestResponse = responseData.Response;

        if (requestResponse === "True") {
          setData((prev) => ({
            ...prev,
            data: responseData.Search,
            totalPages: Math.ceil(parseInt(responseData.totalResults) / 10),
            query: searchText,
            response: requestResponse,
            error: null,
          }));
        } else {
          setData((prev) => ({
            ...prev,
            error: responseData.Error,
            query: searchText,
            response: requestResponse,
          }));
        }
      });
    }
    fetchData();
  };

  const nominatedMovies = (movie) => {
    setNominated((prev) => ({
      ...prev,
      movieList: [...prev.movieList, movie],
      count: nominated.count + 1,
    }));

    if (nominated.count >= 4) {
      setNominated((prev) => ({
        ...prev,
        max: true,
      }));
    }
    console.log(nominated)
  };

  const removeNomination = (movie) => {
    const movieArray = nominated.movieList.forEach((movieElement, index) => {
      if (movie.imdbID === movieElement.imdbID) {
        
        nominated.movieList.splice(index, 1)
        setNominated(prev => ({
          ...prev, 
          movieList: nominated.movieList,
          count: nominated.count - 1,
        }))
      }
    })
    console.log(nominated.movieList)
    return movieArray;
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SearchBar query={searchQuery} />
      <Row>
        <Col xs={6}>
          {data.query && data.query && data.error === null ? (
            <h3 className="results-list">{`Results for "${data.query}"`}</h3>
          ) : null}
          <SearchResults
            data={data}
            query={data.query}
            nominateMovie={nominatedMovies}
            contender={nominated}
          />
        </Col>
        {nominated && nominated.count > 0 ? (
          <Col xs={6}>
            <h3 className="nominations-list">{`Nominated Movies`}</h3>
            <NominatedMovies data={nominated} deleteMovie={removeNomination}/>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default App;
