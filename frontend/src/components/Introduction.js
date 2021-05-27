import { Card } from "react-bootstrap";
function Description() {
  return (
    <Card>
      <Card.Header className="text-center" as="h3">
        Introduction
      </Card.Header>
      <Card.Body>
        <p>
          Implements a REST API that uses proper resource based URLs, pagination
          and status codes. Uses Google OAuth 2.0 to create and authorize users
          for protected resourses. Application is deployed on Google Cloud
          Platform using Google App Engine and Datastore NoSQL database. All
          code can be found in the linked GitHub repository along with a Postman
          collection and environemt to test API functionality.
        </p>
        <h5>REST API Base URL</h5>
        <p>https://robertb2-finalproject.wl.r.appspot.com</p>
      </Card.Body>
    </Card>
  );
}

export default Description;
