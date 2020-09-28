import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faBookReader } from "@fortawesome/free-solid-svg-icons";
import { useRouter } from "next/router";


import { Container, Col, Card, Row, CardBody, CardHeader } from "reactstrap";

const TestTypes = (props) => {
  const router = useRouter();
  return (
    <section className="py-6 bg-white">
      <Container>
        <div className="mb-4 text-center">
          <h2>Available Tests</h2>
        </div>

        <Row>
          
          <Col md={6} lg={4}>
            <Card tag="blockquote" className="border"  onClick={() => router.push("/naplan/3")}>
              <CardBody className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div>
                    <FontAwesomeIcon icon={faBookReader} />
                  </div>
                  <div className="pl-3">
                    <h2 className="mb-1 mt-2">Year 3 Naplan</h2>
                    <small className="d-block text-muted h5 font-weight-normal">
                      Numeracy and Literacy tests for year 3.
                    </small>
                  </div>
                </div>
                <p className="lead mb-2">10 tests including 400+ questions</p>

                <div className="landing-stars"></div>
              </CardBody>
            </Card>
          </Col>

          <Col md={6} lg={4}>
            <Card tag="blockquote" className="border"  onClick={() => router.push("/icas/3")}>
              <CardBody className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div>
                    <FontAwesomeIcon icon={faBookReader} />
                  </div>
                  <div className="pl-3">
                    <h2 className="mb-1 mt-2">ICAS Year 2</h2>
                    <small className="d-block text-muted h5 font-weight-normal">
                      ICAS style tests for numeracy and literacy
                    </small>
                  </div>
                </div>
                <p className="lead mb-2">15 tests including 500+ questions</p>

                <div className="landing-stars"></div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card tag="blockquote" className="border" onClick={() => router.push("/naplan/5")}>
              <CardBody className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div>
                    <FontAwesomeIcon icon={faBookReader} />
                  </div>
                  <div className="pl-3">
                    <h2 className="mb-1 mt-2">Year 5 Naplan</h2>
                    <small className="d-block text-muted h5 font-weight-normal">
                      Numeracy and Literacy tests for year .
                    </small>
                  </div>
                </div>
                <p className="lead mb-2">15 tests including 500+ questions</p>

                <div className="landing-stars"></div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default TestTypes;
