import { Container, Row, Col } from "react-bootstrap";
import "./App.css";

function Home() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="center">
            <br></br>
            <h1 className="title">Google App Engine REST API</h1>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
