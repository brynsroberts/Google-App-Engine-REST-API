import { Card } from "react-bootstrap";
import Boats from "./Boats";
import Users from "./Users";
import Loads from "./Loads";
function Entities() {
  return (
    <Card>
      <Card.Header className="text-center">Entities</Card.Header>
      <Card.Body>
        <Card.Title>Users</Card.Title>
        <Users />
        <Card.Title>Boats</Card.Title>
        <Boats />
        <Card.Title>Loads</Card.Title>
        <Loads />
      </Card.Body>
    </Card>
  );
}

export default Entities;
