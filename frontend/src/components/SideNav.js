import { Nav } from "react-bootstrap";
function SideNav() {
  return (
    <Nav defaultActiveKey="/home" className="flex-column sideNav">
      <Nav.Link href="#introduction">Introduction</Nav.Link>
      <Nav.Link href="#users">Users</Nav.Link>
      <Nav.Link href="#boats">Boats</Nav.Link>
      <Nav.Link href="#loads">Loads</Nav.Link>
      <Nav.Link href="#relationships">Relationships</Nav.Link>
    </Nav>
  );
}

export default SideNav;
