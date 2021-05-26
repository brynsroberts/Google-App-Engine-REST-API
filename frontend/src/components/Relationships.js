import { Card } from "react-bootstrap";
function Relationships() {
  return (
    <Card>
      <Card.Header className="text-center" as="h3">
        Relationships
      </Card.Header>
      <Card.Body>
        <h4>Users and Boats</h4>
        <p>
          Users have a one to many relationship with boats. A single user can
          own zero, one, or many boats. Boats have a one to one relationship
          with users. Boats will always be owned by one user.
        </p>
        <h4>Boats and Loads</h4>
        <p>
          Boats can have one to many loads. Boats are created without any loads.
          Loads can only have one boat. The loads boat will be under the boat
          “carrier” key. Loads are created without any carrier. Loads can be
          added to boats one at a time. They require the boats JWT as the boats
          are owned by users.
        </p>
      </Card.Body>
    </Card>
  );
}

export default Relationships;
