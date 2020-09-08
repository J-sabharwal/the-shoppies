import React, { useState, useEffect } from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import SearchBar from "./components/SearchBar";
import SearchResults from "./components/SearchResults";
import NominatedMovies from "./components/NominatedMovies";
import Pagination from "./components/Pagination";
import { Col, Row, Alert } from "reactstrap";
const apiKey = process.env.REACT_APP_API_KEY;

function App() {
  const [visible, setVisible] = useState(true);
  const [searchResults, setSearchResults] = useState({
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
  });

  useEffect(() => {
    const nominations = localStorage.getItem("nominated");

    if (nominations) {
      setNominated(JSON.parse(localStorage.getItem("nominated")));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("nominated", JSON.stringify(nominated));
  });

  const onDismiss = () => setVisible(false);

  const searchQuery = (query, pageNumber = 1) => {
    const searchText = encodeURIComponent(query.trim());
    const url = `https://www.omdbapi.com/?apikey=${apiKey}&s=${searchText}&type=${searchResults.type}&page=${pageNumber}`;

    axios.get(url).then((response) => {
      const responseData = response.data;
      const requestResponse = responseData.Response;

      if (requestResponse === "True") {
        setSearchResults((prev) => ({
          ...prev,
          data: responseData.Search,
          totalPages: Math.ceil(parseInt(responseData.totalResults) / 10),
          query: searchText,
          response: requestResponse,
          currentPage: pageNumber,
          error: null,
        }));
      } else {
        setSearchResults((prev) => ({
          ...prev,
          error: responseData.Error,
          query: searchText,
          response: requestResponse,
        }));
      };
    });
  };

  const nominateMovie = (movie) => {
    if (nominated.movieList.length <= 4) {
      setNominated((prev) => ({
        ...prev,
        movieList: [...prev.movieList, movie],
        count: nominated.count + 1,
      }));
    };
  };

  const removeNomination = (movieId) => {
    const listOfMovies = nominated.movieList;

    listOfMovies.forEach((nominatedMovie, index) => {
      if (movieId === nominatedMovie.imdbID) {
        listOfMovies.splice(index, 1);

        setNominated((prev) => ({
          ...prev,
          movieList: listOfMovies,
          count: nominated.count - 1,
        }));
      }
    });

    if (!visible) {
      setVisible(true);
    };
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SearchBar searchQuery={searchQuery} />
      <h6>
        Welcome to The Shoppies. Search for your favourite movies and nominate upto <b>Five</b> movies.
      </h6>
      {nominated.count & (nominated.count >= 5) ? (
        <div>
          <Alert
            className="fade"
            color="primary"
            isOpen={visible}
            toggle={onDismiss}
          >
            Your <b>five</b> nominations have been made. Thanks for Voting!
          </Alert>
        </div>
      ) : null}
      <Row>
        <Col xs={{ size: 12, order: "last" }} lg={{ size: 6, order: "first" }}>
          {searchResults.query && searchResults.error === null ? (
            <h3 className="results-list">{`Results for "${searchResults.query}"`}</h3>
          ) : null}
          <SearchResults
            data={searchResults}
            query={searchResults.query}
            nominateMovie={nominateMovie}
            nominees={nominated}
          />
          <Pagination data={searchResults} searchQuery={searchQuery} />
        </Col>
        {nominated && nominated.count > 0 ? (
          <Col
            xs={{ size: 12, order: "first" }}
            lg={{ size: 6, order: "last" }}
          >
            <h3 className="nominations-list">{`Nominations`}</h3>
            <NominatedMovies data={nominated} deleteMovie={removeNomination} />
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default App;
