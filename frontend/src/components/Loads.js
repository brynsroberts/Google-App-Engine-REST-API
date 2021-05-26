import { Table, Card } from "react-bootstrap";
function Loads() {
  return (
    <Card>
      <Card.Header className="text-center" as="h3">
        Loads
      </Card.Header>
      <Card.Body>
        <Table>
          <thead>
            <tr>
              <th className="columnWidth">Name</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>id</td>
              <td>
                String. The id of the load. Datastore automatically generates
                it.
              </td>
            </tr>
            <tr>
              <td>volume</td>
              <td>
                Integer. Volume of the load in cubic feet. Must be larger than
                0.
              </td>
            </tr>
            <tr>
              <td>content</td>
              <td>
                String. E.g., Apples. What the load holds. Cannot have any
                special characters. Spaces are allowed. Must be between 1-256
                characters in length.
              </td>
            </tr>
            <tr>
              <td>creation_date</td>
              <td>
                String. E.g., 12/22/2021. The date the load was created. Must be
                format DD/MM/YYYY or DD-MM-YYYY.
              </td>
            </tr>
            <tr>
              <td>carrier</td>
              <td>
                An object that holds the id, name, and self-URL to the boat the
                load is currently on. All fields will be set to null if the load
                is not on a boat. Initially set to null for all fields.
              </td>
            </tr>
            <tr>
              <td>self</td>
              <td>String. URL to the current load</td>
            </tr>
          </tbody>
        </Table>
        <br></br>
        <Table className="table-fixed">
          <thead>
            <tr>
              <th className="columnWidth">Request</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>POST /loads</td>
              <td>
                Allows you to create a new load. All newly created loads will
                not be assigned to a boat.
              </td>
            </tr>
            <tr>
              <td>GET /loads/:load_id</td>
              <td>Allows you to get an existing load.</td>
            </tr>
            <tr>
              <td>GET /loads</td>
              <td>List all the loads.</td>
            </tr>
            <tr>
              <td>PUT /loads/:load_id</td>
              <td>Allows you to update an entire load.</td>
            </tr>
            <tr>
              <td>PATCH /loads/:load_id</td>
              <td>
                Allows you to update between one and two entities in a load.
              </td>
            </tr>
            <tr>
              <td>DELETE /loads/:load_id</td>
              <td>
                Allows you to delete a load. If the load being deleted is on a
                boat, the load will be taken off that boat.
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Loads;
