import React, { useState } from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import SearchBar from "./components/searchBar";
import SearchResults from "./components/searchResults";
import NominatedMovies from "./components/NominatedMovies";
import Pagination from "./components/Pagination";
import { Col, Row } from "reactstrap";

function App() {
  const [data, setData] = useState({
    data: [],
    currentPage: 1,
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

  const searchQuery = (query, pageNumber = 1) => {
    const searchText = query.trim();
    const url = `http://www.omdbapi.com/?apikey=ad24814f&s=${searchText}&type=${data.type}&page=${pageNumber}`;

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
            currentPage: pageNumber,
            error: null,
          }));
        } else {
          setData((prev) => ({
            ...prev,
            error: responseData.Error,
            query: searchText,
            response: requestResponse,
          }));
        };
      });
    };
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
    };
  };

  const removeNomination = (movie) => {
    const movieArray = nominated.movieList.forEach((movieElement, index) => {
      if (movie.imdbID === movieElement.imdbID) {
        nominated.movieList.splice(index, 1);
        setNominated((prev) => ({
          ...prev,
          movieList: nominated.movieList,
          count: nominated.count - 1,
        }));
      }
    });
    return movieArray;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SearchBar query={searchQuery} />
      <Row>
        <Col md={12} lg={6}>
          {data.query && data.query && data.error === null ? (
            <h3 className="results-list">{`Results for "${data.query}"`}</h3>
          ) : null}
          <Pagination data={data} state={setData} fetchData={searchQuery} />
          <SearchResults
            data={data}
            query={data.query}
            nominateMovie={nominatedMovies}
            contender={nominated}
          />
        </Col>
        {nominated && nominated.count > 0 ? (
          <Col md={12} lg={6}>
            <h3 className="nominations-list">{`Nominated Movies`}</h3>
            <NominatedMovies data={nominated} deleteMovie={removeNomination} />
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default App;
