import React from "react";
import { Col, Row, Button } from "reactstrap";

function Pagination(props) {
  const query = props.data.query;
  const searchQuery = props.fetchData;
  const lastPage = props.data.totalPages;
  let currentPage = props.data.currentPage;

  const changePage = (button) => {
    let newPageNumber;

    switch (button) {
      case "first":
        newPageNumber = currentPage = 1;
        searchQuery(query, newPageNumber);
        break;
      case "previous":
        newPageNumber = currentPage - 1;
        searchQuery(query, newPageNumber);
        break;
      case "next":
        newPageNumber = currentPage + 1;
        searchQuery(query, newPageNumber);
        break;
      case "last":
        newPageNumber = currentPage = lastPage;
        searchQuery(query, newPageNumber);
        break;
      default:
        break;
    };
  };

  return (
    <div>
      <Row md={10} lg={12}>
        {lastPage && lastPage > 1 ? (
          <Col md={10} lg={12} className="pagination-btn">
            <Button
              className="previous-btn"
              color="warning"
              style={{
                borderRadius: "0.5rem 0 0 0.5rem",
                fontSize: "80%",
              }}
              type="submit"
              onClick={() => changePage("first")}
            >
              {"<<"}
            </Button>
            <Button
              className="previous-btn"
              color="secondary"
              style={{
                borderRadius: "0 0 0 0",
                fontSize: "80%",
              }}
              type="submit"
              disabled={currentPage === 1 ? true : false}
              onClick={() => changePage("previous")}
            >
              Previous Page
            </Button>
            <Button
              className="next-btn"
              color="secondary"
              style={{
                borderRadius: "0 0 0 0",
                fontSize: "80%",
              }}
              type="submit"
              disabled={currentPage === lastPage ? true : false}
              onClick={() => changePage("next")}
            >
              Next Page
            </Button>
            <Button
              className="previous-btn"
              color="warning"
              style={{
                borderRadius: "0 0.5rem 0.5rem 0",
                fontSize: "80%",
              }}
              type="submit"
              onClick={() => changePage("last")}
            >
              {">>"}
            </Button>
          </Col>
        ) : null}
      </Row>
    </div>
  );
};

export default Pagination;
