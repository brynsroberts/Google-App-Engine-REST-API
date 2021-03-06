import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function Navigation() {
  return (
    <Navbar
      collapseOnSelect
      className="sticky-top"
      expand="sm"
      bg="primary"
      variant="dark"
    >
      <Container>
        <Navbar.Brand>Google App Engine REST API</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav>
            <Link className="nav-link" to="/">
              Home
            </Link>
          </Nav>
          <Nav>
            <Link className="nav-link" to="/authentication">
              Authentication
            </Link>
          </Nav>
          <Nav>
            <Link
              className="nav-link"
              to={{
                pathname: "https://github.com/brynsroberts/cs493-finalproject",
              }}
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
