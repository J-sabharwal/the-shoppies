import React, { useState } from "react";
import "./searchBar.css";
import { Col, Button, InputGroup, InputGroupAddon, Input } from "reactstrap";

function SearchBar(props) {
  const [query, setQuery] = useState("");

  const handleSubmit = (event) => {
    setQuery(event.target.value);
  };

  const Search = (event) => {
    event.preventDefault();
    props.query(query);
    resetSearchField();
  };

  const onKeyPress = (event) => {
    if (event.which === 13) {
      event.preventDefault();
      props.query(query);
      resetSearchField();
    };
  };

  const resetSearchField = () => {
    setQuery("");
  };

  return (
    <div id="movie-input">
      <Col md={12}>
        <InputGroup size="lg">
          <Input
            type="text"
            placeholder="Search by name"
            value={query}
            onChange={handleSubmit}
            onKeyPress={onKeyPress}
          />
          <InputGroupAddon addonType="append">
            <Button
              color="warning"
              onSubmit={Search}
              onClick={Search}
              type="submit"
            >
              <i className="fa fa-search"></i>
            </Button>
          </InputGroupAddon>
        </InputGroup>
      </Col>
    </div>
  );
};

export default SearchBar;
