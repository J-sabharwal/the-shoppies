import React, { useState, useEffect } from 'react';
import logo from './the_shoppies.png';
import './App.css';
import axios from "axios";
import SearchBar from './components/searchBar';

function App() {
  const [data, setData] = useState({
    data: [],
    page: 1,
    totalPages: 0,
    type: "movie",
  });
  
  const searchQuery = (searchText) => {
    const url = `http://www.omdbapi.com/?apikey=ad24814f&s=${searchText}&type=${data.type}&$p=${data.page}`

    async function fetchData() {
      const results = axios.get(url)
        .then(response => {
          setData(prev => ({
            ...prev,
            data: response.data.Search,
            totalPages: Math.ceil(parseInt(response.data.totalResults) / 10),
          }));
        }
      )};
    fetchData();
  };
  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SearchBar query={searchQuery}/>
    </div>
  );
}

export default App;
