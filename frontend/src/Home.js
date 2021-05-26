import { Container, Row, Col } from "react-bootstrap";
import Entities from "./components/Entities";
import "./App.css";

function Home() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="center">
            <br></br>
            <h1 className="title">Google App Engine REST API</h1>
            <br></br>
            <Entities />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
