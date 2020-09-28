import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import { Container, Col, Card, Row, CardBody, CardHeader } from "reactstrap";


const Tests = (props) => {
  let availableTests = null;
  if (props.testList) {
    availableTests = props.testList.testsByTypeAndYear.map((test) => {
      return (
        <Col md={6} lg={4}>
          <Card tag="blockquote" className="border">
            <CardBody className="p-4">
              <div className="d-flex align-items-center mb-3">
                <div>
                  <FontAwesomeIcon icon={faPencilAlt} />
                </div>
                <div className="pl-3">
                  <h5 className="mb-1 mt-2">Year {test.year}</h5>
                  <small className="d-block text-muted h5 font-weight-normal">
                    {test.text}
                  </small>
                </div>
              </div>
              <p className="lead mb-2">{test.description}</p>

              <div className="landing-stars"></div>
            </CardBody>
          </Card>
        </Col>
      );
    });
  }
  return (
    <section className="py-6 bg-white">
      <Container>
        <div className="mb-4 text-center">
          <h2>Available Tests</h2>          
        </div>

        <Row>{availableTests}</Row>
      </Container>
    </section>
  );
};

export default Tests;
