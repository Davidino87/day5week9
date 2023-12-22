import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import MyNav from "./component/MyNav";
import { Container } from "react-bootstrap";
import TVShows from "./component/TVShows";

function App() {
  return (
    <>
      <MyNav />
      <Container fluid>
        <TVShows></TVShows>
      </Container>
    </>
  );
}

export default App;
