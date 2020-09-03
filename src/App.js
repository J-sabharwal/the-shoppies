import React, { useState } from 'react';
import logo from './logo.png';
import './App.css';
import axios from "axios";
import SearchBar from './components/searchBar';
import SearchResults from './components/searchResults';
import NominatedMovies from './components/NominatedMovies';
import { Col, Row } from 'reactstrap';

function App() {
  const [data, setData] = useState({
    data: [],
    page: 1,
    totalPages: 0,
    type: "movie",
    error: null,
    response: false,
  });

  const [ nominated, setNominated ] = useState({
    nomination: [],
    count: 0,
    max: false,
  })

  // function to nominate movie 
  
  const searchQuery = (searchText) => {
    const url = `http://www.omdbapi.com/?apikey=ad24814f&s=${searchText}&type=${data.type}&page=${data.page}`

    async function fetchData() {
      axios.get(url)
        .then(response => {
          const responseData = response.data;
          const requestResponse = responseData.Response;

          if (requestResponse === "True") {
            setData(prev => ({
              ...prev,
              data: responseData.Search,
              totalPages: Math.ceil(parseInt(responseData.totalResults) / 10),
              query: searchText,
              response: requestResponse,
              error: null,
          }));
          } else {
            setData(prev => ({
              ...prev,
              error: responseData.Error,
              query: searchText,
              response: requestResponse,
          }));
          }
        }
      )};
    fetchData();
  };

  const nominatedMovies = (movie) => {
    setNominated(prev => ({
      ...prev,
      nomination: [...prev.nomination, movie],
      count: nominated.count + 1,  
    }));

    if (nominated.count >= 4) {
      setNominated(prev => ({
        ...prev, 
        max: true,
      }))
    }
    console.log(nominated)
  }
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SearchBar query={searchQuery}/>
      <Row>
        <Col xs={6}>
        {data.query && data.query && data.error === null ? 
          <h3 className="query">{`Results for "${data.query}"`}</h3> : null}
          <SearchResults data={data} query={data.query} nomination={nominatedMovies}/>
        </Col>
          {nominated && nominated.count > 0 ? 
            <Col xs ={6}>
              <h3 className="query">{`Nominated Movies`}</h3>
              <NominatedMovies data={nominated}/>
          </Col> : null }
      </Row>
    </div>
  );
}

export default App;
