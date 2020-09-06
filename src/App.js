import React, { useState } from "react";
import logo from "./logo.png";
import "./App.css";
import axios from "axios";
import SearchBar from "./components/searchBar";
import SearchResults from "./components/searchResults";
import NominatedMovies from "./components/NominatedMovies";
import Pagination from "./components/Pagination";
import { Col, Row, Alert } from "reactstrap";

function App() {
  const [visible, setVisible] = useState(true);
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
  });

  const onDismiss = () => setVisible(false);

  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }

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
        }
      });
    };
    fetchData();
  };

  const nominatedMovies = (movie) => {
    if (nominated.movieList.length <= 4) {
      setNominated((prev) => ({
        ...prev,
        movieList: [...prev.movieList, movie],
        count: nominated.count + 1,
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
      };
    });

    if (!visible) {
      setVisible(true);
    };
    return movieArray;
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SearchBar query={searchQuery} />
      <h6>Welcome to the Shoppies. Here you can make upto <b>Five</b> movie nominations.</h6>
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
        <Col 
          xs={{ size:12, order: 'last'}}
          lg={{ size: 6, order: 'first' }}
        >
          {data.query && data.query && data.error === null ? (
            <h3 className="results-list">{`Results for "${data.query}"`}</h3>
          ) : null}
          <SearchResults
            data={data}
            query={data.query}
            nominateMovie={nominatedMovies}
            contender={nominated}
          />
          <Pagination data={data} state={setData} fetchData={searchQuery} />
        </Col>
        {nominated && nominated.count > 0 ? (
          <Col 
            xs={{ size:12, order: 'first'}}
            lg={{ size: 6, order: 'last' }}
          >
            <h3 className="nominations-list">{`Nominated Movies`}</h3>
            <NominatedMovies data={nominated} deleteMovie={removeNomination} />
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default App;
