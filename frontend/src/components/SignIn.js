import { Container, Card } from "react-bootstrap";
import { useEffect, useState } from "react";
import GoogleButton from "react-google-button";

function SignIn(props) {
  const [title, setTitle] = useState("Sign in to receive JWT");

  useEffect(() => {
    setTitle("Sign in again to receive new JWT");
  }, [props.id_token]);
  return (
    <div>
      <Container>
        <br></br>
        <Card className="text-center">
          <Card.Header as="h5">Authentication</Card.Header>
          <Card.Body>
            <Card.Title>{title}</Card.Title>
            <Card.Text>
              JWT can be used as bearer token to make protected requests for
              boat entities.
            </Card.Text>
            <div className="parent">
              <a
                className="justify-content-center"
                href="https://robertb2-finalproject.wl.r.appspot.com/oauth"
              >
                <GoogleButton
                  className="text-center"
                  type="light" // can be light or dark
                />
              </a>
            </div>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

export default SignIn;
