import React from 'react';
import './searchBar.css';
import { Col, Button, InputGroup, InputGroupAddon, Input } from 'reactstrap';

function searchBar() {

  return (
    <div id="movie-input">
      <Col md={12} >
        <InputGroup>
          <Input placeholder="Search by name"/>
          <InputGroupAddon addonType="append">
            <Button color="warning">Search</Button>
          </InputGroupAddon>
        </InputGroup>
      </Col>
    </div>
  );
};

export default searchBar;