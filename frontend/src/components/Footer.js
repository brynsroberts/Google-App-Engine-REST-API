import { Navbar, Nav } from "react-bootstrap";

function Footer(props) {
  return (
    <Navbar
      className="justify-content-center"
      fixed="bottom"
      bg="light"
      variant="light"
    >
      <Nav>
        <Nav.Link
          href="https://bryanroberts.netlify.app/"
          className="nav-link"
          target="_blank"
          rel="noopener noreferrer"
        >
          &#169; 2021 Bryan Roberts
        </Nav.Link>
      </Nav>
    </Navbar>
  );
}

export default Footer;
