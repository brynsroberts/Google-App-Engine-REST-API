import { Container, Row, Col } from "react-bootstrap";
import Users from "./components/Users";
import Boats from "./components/Boats";
import Loads from "./components/Loads";
import Relationship from "./components/Relationships";
import "./App.css";

function Home() {
  return (
    <div className="App">
      <Container className="content">
        <Row>
          <Col>
            <h1 className="title">
              CS493 Cloud Application Development - Final Project
            </h1>
            <br></br>
            <Users />
            <br></br>
            <Boats />
            <br></br>
            <Loads />
            <br></br>
            <Relationship />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
