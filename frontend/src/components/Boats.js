import { Table, Card } from "react-bootstrap";
function Boats() {
  return (
    <Card>
      <Card.Header className="text-center" as="h3">
        Boats
      </Card.Header>
      <Card.Body>
        <p></p>
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
              <td>String.  The id of the boat. Datastore automatically generates it.</td>
            </tr>
            <tr>
              <td>name</td>
              <td>
                String.  Name of the boat. E.g., Sea Witch. Cannot have any special
                characters. Spaces are allowed. Must be between 1-256 characters
                in length.
              </td>
            </tr>
            <tr>
              <td>type</td>
              <td>
                String. The type of the boat. E.g., Sailboat, Catamaran, etc.
                Cannot have any special characters. Spaces are allowed. Must be
                between 1-256 characters in length.
              </td>
            </tr>
            <tr>
              <td>length</td>
              <td>Integer.  The length of the boat in feet. Must be larger than 0.</td>
            </tr>
            <tr>
              <td>loads</td>
              <td>
                Array of load objects with load id and self-link to URL for
                object in datastore. Lists all the loads currently on the boat.
                Boats are initially created with no loads.
              </td>
            </tr>
            <tr>
              <td>owner</td>
              <td>String. The self URL for the user who owns the boat.</td>
            </tr>
            <tr>
              <td>self</td>
              <td>String.  URL to the current boat</td>
            </tr>
          </tbody>
        </Table>
        <br></br>
        <Table>
          <thead>
            <tr>
              <th className="columnWidth">Request</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>POST /boats</td>
              <td>
                Allows you to create a new boat that belongs to the bearer token
                user.
              </td>
            </tr>
            <tr>
              <td>GET /boats/:boat_id</td>
              <td>
                Allows you to get an existing boat that belongs to the bearer
                token user.
              </td>
            </tr>
            <tr>
              <td>GET /boats</td>
              <td>List all the boats that belongs to the bearer token user.</td>
            </tr>
            <tr>
              <td>PUT /boats/:boat_id</td>
              <td>
                Allows you to change all three attributes for a boat that
                belongs to the bearer token user.
              </td>
            </tr>
            <tr>
              <td>PATCH /boats/:boat_id</td>
              <td>
                Allows you to change between one and two of the attributes for a
                boat that belongs to the bearer token user.
              </td>
            </tr>
            <tr>
              <td>DELETE /boats/:boat_id</td>
              <td>
                Allows you to delete a boat. Note that if the boat is currently
                having loads, deleting the boat will unload the loads. This will
                update the “carrier” of the loads currently on the boat being
                deleted.
              </td>
            </tr>
            <tr>
              <td>PUT /boats/:boat_id/loads/:load_id</td>
              <td>
                A load is put onto a boat. Will update the load carrier and the
                boats load array. Only the owner of the boat with a valid JWT
                can assign load to the boat.
              </td>
            </tr>
            <tr>
              <td>DELETE /boats/:boat_id/loads/:load_id</td>
              <td>
                Load has been taken off the boat. Will update the load carrier
                and the boats load array. Only the owner of the boat with a
                valid JWT can assign load to the boat.
              </td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Boats;
