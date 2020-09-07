import React, { useState } from "react";
import { Col, Button, InputGroup, InputGroupAddon, Input } from "reactstrap";

function SearchBar(props) {
  const [query, setQuery] = useState("");
  const searchQuery = props.searchQuery;

  const handleSubmit = (event) => {
    setQuery(event.target.value);
  };

  const search = (event) => {
    event.preventDefault();
    searchQuery(query);
    resetSearchField();
  };

  const onKeyPress = (event) => {
    if (event.which === 13) {
      search(event);
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
              onClick={search}
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
