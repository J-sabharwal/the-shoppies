import React, { useState } from 'react';
import './searchBar.css';
import { Col, Button, Form, InputGroup, InputGroupAddon, Input } from 'reactstrap';

function SearchBar(props) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSubmit = (event) => {
    setSearchQuery(event.target.value)
  };
  
  const Search = (event) => {
    event.preventDefault();
    props.query(searchQuery);
    resetSearchField();
  }

  const resetSearchField = () => {
    setSearchQuery("")
  }
  
  return (
    <div id="movie-input">
      <Col md={12} >
        <InputGroup>
          <Input
            type="text"
            placeholder="Search by name" 
            value={searchQuery}
            onChange={handleSubmit}
          />
          <InputGroupAddon addonType="append">
            <Button color="warning" onClick={Search} type="submit">Search</Button>
          </InputGroupAddon>
        </InputGroup>
      </Col>
    </div>
  );
};

export default SearchBar;