import { Container, Row, Col, Card } from "react-bootstrap";

function UserInfo(props) {
  return (
    <div>
      <br></br>
      <Container>
        <Row>
          <Col>
            <Card className="text-center">
              <Card.Header as="h5">JWT</Card.Header>
              <Card.Body>
                <Card.Text>{props.id_token}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Container>
        <Row>
          <Col>
            <Card className="text-center">
              <Card.Header as="h5">User Token ID</Card.Header>
              <Card.Body>
                <Card.Text>{props.id_user}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
      <br></br>
      <Container>
        <Row>
          <Col>
            <Card className="text-center">
              <Card.Header as="h5">Datastore Self</Card.Header>
              <Card.Body>
                <Card.Text>
                  <a
                    href={props.self}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {props.self}
                  </a>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserInfo;
