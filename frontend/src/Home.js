import { Container, Row, Col, Button } from "react-bootstrap";
import "./App.css";

function Home() {
  return (
    <div className="App">
      <Container>
        <Row>
          <Col className="center">
            <h1>Landing Page CS493 - Final Project</h1>
            <a href="http://localhost:8080/oauth">
              <Button>Redirect to Google OAuth 2.0 Endpoint</Button>
            </a>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
