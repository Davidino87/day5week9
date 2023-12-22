import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Dropdown } from "react-bootstrap";
import { Grid, Grid3x3 } from "react-bootstrap-icons";

function TVShows() {
  const [trending, setTrending] = useState();
  const [again, setAgain] = useState();
  const [newReleases, setNewReleases] = useState();

  useEffect(() => {
    (async () => {
      try {
        const responses = await Promise.all([
          fetch("http://www.omdbapi.com/?apikey=6abe2732&s=harry"),
          fetch("http://www.omdbapi.com/?apikey=6abe2732&s=lord"),
          fetch("http://www.omdbapi.com/?apikey=6abe2732&s=star"),
        ]);

        const [trendingRes, againRes, newReleasesRes] = await Promise.all(responses.map((res) => res.json()));
        setTrending(trendingRes);
        setAgain(againRes);
        setNewReleases(newReleasesRes);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    })();
  }, []);

  if (!trending || !again || !newReleases) {
    return null;
  }
  console.log(trending);

  return (
    <Container fluid>
      <Row className="align-items-center">
        <Col md="auto">
          <h2 className="text-light mb-0">TV Shows</h2>
        </Col>
        <Col md="auto">
          <Dropdown as={Button.Group} className="border border-secondary px-2">
            <Button variant="dark" className="bg-transparent px-0 py-0 pb-1">
              Genres
            </Button>

            <Dropdown.Toggle variant="dark" className="bg-transparent px-0 ps-1 py-0" />

            <Dropdown.Menu>
              <Dropdown.Item href="#">Comedy</Dropdown.Item>
              <Dropdown.Item href="#">Drama</Dropdown.Item>
              <Dropdown.Item href="#">Thriller</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Col>
        <Col md="auto" className="text-light ms-auto">
          <Grid className="fs-5 mx-3" />
          <Grid3x3 className="fs-5 mx-3" />
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h3 className="text-light mb-0">Trending Now</h3>
          <Row style={{ overflow: "auto", flexWrap: "nowrap" }}>
            {trending.Search.map((movie) => (
              <img style={{ width: "200px" }} src={movie.Poster} alt={movie.Title} />
            ))}
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h3 className="text-light mb-0">Watch again</h3>
          <Row style={{ overflow: "auto", flexWrap: "nowrap" }}>
            {again.Search.map((movie) => (
              <img style={{ width: "200px" }} src={movie.Poster} alt={movie.Title} />
            ))}
          </Row>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col>
          <h3 className="text-light mb-0">New releases</h3>
          <Row style={{ overflow: "auto", flexWrap: "nowrap" }}>
            {newReleases.Search.map((movie) => (
              <img style={{ width: "200px" }} src={movie.Poster} alt={movie.Title} />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
}

export default TVShows;
