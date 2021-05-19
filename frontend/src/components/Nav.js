import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import google_sign_in from "../static/btn_google_signin_light_normal_web.png";

function Navigation() {
  return (
    <Navbar
      collapseOnSelect
      className="sticky-top"
      expand="sm"
      bg="light"
      variant="light"
    >
      <Container>
        <Navbar.Brand>CS493 Final Project</Navbar.Brand>
        <Nav>
          <Link className="nav-link" to="/">
            Home
          </Link>
        </Nav>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            <a href="http://localhost:8080/oauth">
              <img src={google_sign_in} alt="Google Sign In Button" />
            </a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
