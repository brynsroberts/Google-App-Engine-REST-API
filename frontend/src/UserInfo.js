import { Container, Row, Col, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

function UserInfo(props) {
  const [id_token, setIdToken] = useState("");
  const [id_user, setIDUser] = useState("");

  useEffect(() => {
    axios
      .get("http://localhost:8080/users/token/info")
      .then((res) => {
        setIdToken(res.data.id_token);
        setIDUser(res.data.id_user);
      })
      .catch(() => {
        console.log("error");
      });
  }, []);

  return (
    <div>
      <br></br>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>JWT Bearer Token</Card.Header>
              <Card.Body>
                <Card.Text>{id_token}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>User ID</Card.Header>
              <Card.Body>
                <Card.Text>{id_user}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserInfo;
