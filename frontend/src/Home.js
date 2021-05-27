import { Container, Row, Col } from "react-bootstrap";
import SideNav from "./components/SideNav";
import Introduction from "./components/Introduction";
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
          <Col xs={2}>
            <br></br>
            <SideNav />
          </Col>
          <Col className="anchor">
            <br></br>
            <h1 className="title">
              CS493 Cloud Application Development - Final Project
            </h1>
            <br id="introduction"></br>
            <Introduction />
            <br id="users"></br>
            <Users />
            <br id="boats"></br>
            <Boats />
            <br id="loads"></br>
            <Loads />
            <br id="relationships"></br>
            <Relationship />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Home;
