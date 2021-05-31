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
          and status codes. Uses Google OAuth API as a JWT provider to
          authenticate users for protected resources. Written using MVC
          desing-pattern with React on the front-end and Node.js/Express on the
          back-end. Application is deployed on Google Cloud Platform using
          Google App Engine and Google Cloud Datastore NoSQL database. All code
          can be found in the linked GitHub repository along with a Postman
          collection and environment to test API functionality.
        </p>
        <h4>REST API Base URL</h4>
        <p>https://robertb2-finalproject.wl.r.appspot.com</p>
      </Card.Body>
    </Card>
  );
}

export default Description;
