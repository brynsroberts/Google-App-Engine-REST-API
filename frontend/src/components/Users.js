import { Table, Card } from "react-bootstrap";
function Users() {
  return (
    <Card>
      <Card.Header className="text-center" as="h3">
        Users
      </Card.Header>
      <Card.Body>
        <Table className="table-fixed">
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
                String. The id of the user. Datastore automatically generates
                it.
              </td>
            </tr>
            <tr>
              <td>token_id</td>
              <td>
                String. Automatically generated upon logging in. Used to
                uniquely identify users after authenticating protected resources
                with JWT
              </td>
            </tr>
            <tr>
              <td>boats</td>
              <td>
                Array. Specifies user owned boats with boat id and self-link to
                URL for boat object in Datastore.
              </td>
            </tr>
            <tr>
              <td>self</td>
              <td>String. URL to the current user</td>
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
              <td>GET /users/:user_id</td>
              <td>Allows you to get an existing user.</td>
            </tr>
            <tr>
              <td>GET /users</td>
              <td>List all the users.</td>
            </tr>
          </tbody>
        </Table>
      </Card.Body>
    </Card>
  );
}

export default Users;
