import { Container, Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
// import axios from "axios";
import "./App.css";

function UserInfo(props) {
  // const [id_token, setIdToken] = useState("");

  // useEffect(() => {
  //   axios
  //     .get("http://localhost:8080/user")
  //     .then((res) => {
  //       setIdToken(res.data.id_token);
  //       console.log(res.data.id_token);
  //     })
  //     .catch((err) => {
  //       console.log("err");
  //     });
  // }, []);

  let { token_id } = useParams();

  return (
    <div>
      <br></br>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>JWT</Card.Header>
              <Card.Body>
                <Card.Title>Bearer Token</Card.Title>
                <Card.Text>{token_id}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default UserInfo;
