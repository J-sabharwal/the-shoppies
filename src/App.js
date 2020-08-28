import React from 'react';
import logo from './the_shoppies.png';
import './App.css';
import SearchBar from './components/searchBar';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
      </header>
      <SearchBar/>
    </div>
  );
}

export default App;
