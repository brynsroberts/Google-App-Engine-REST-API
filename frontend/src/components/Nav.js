import { Navbar, Nav, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

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
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Navigation;
