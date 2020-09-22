import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

import {
    Container,
    Col,
    Card,
    Row,
    CardBody,
    CardHeader
} from "reactstrap"

import {

} from "@fortawesome/fontawesome-svg-core"

const Tests = () => (
    <section className="py-6 bg-white">
      <Container>
        <div className="mb-4 text-center">
          <h2>Available Tests</h2>
          <p className="text-muted">
            Available tests...
          </p>
        </div>
  
        <Row>
          <Col md={6} lg={4}>
            <Card tag="blockquote" className="border">
              <CardBody className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div>
                   <FontAwesomeIcon icon={faPencilAlt}/>
                  </div>
                  <div className="pl-3">
                    <h5 className="mb-1 mt-2">Year 3</h5>
                    <small className="d-block text-muted h5 font-weight-normal">
                      Naplan tests for Year 3
                    </small>
                  </div>
                </div>
                <p className="lead mb-2">
                  “We are totally amazed with a simplicity and the design of the
                  template. Probably saved us hundreds of hours of development. We
                  are absolutely amazed with the support Bootlab has provided us.”
                </p>
  
                <div className="landing-stars">
                  
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card tag="blockquote" className="border">
              <CardBody className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div>
                  <FontAwesomeIcon icon={faPencilAlt}/>
                  </div>
                  <div className="pl-3">
                    <h5 className="mb-1 mt-2">Alejandro</h5>
                    <small className="d-block text-muted h5 font-weight-normal">
                      Bootstrap Themes
                    </small>
                  </div>
                </div>
                <p className="lead mb-2">
                  “Everything is so properly set up that any new additions I'd
                  make would feel like a native extension of the theme versus a
                  simple hack. I definitely feel like this will save me hundredths
                  of hours I'd otherwise spend on designing.”
                </p>
  
                <div className="landing-stars">
                  
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card tag="blockquote" className="border">
              <CardBody className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div>
                  <FontAwesomeIcon icon={faPencilAlt}/>
                  </div>
                  <div className="pl-3">
                    <h5 className="mb-1 mt-2">Jordi</h5>
                    <small className="d-block text-muted h5 font-weight-normal">
                      Bootstrap Themes
                    </small>
                  </div>
                </div>
                <p className="lead mb-2">
                  “I ran into a problem and contacted support. Within 24 hours, I
                  not only received a response but even an updated version that
                  solved my problem and works like a charm. Fantastic customer
                  service!”
                </p>
  
                <div className="landing-stars">
                  
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card tag="blockquote" className="border">
              <CardBody className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div>
                  <FontAwesomeIcon icon={faPencilAlt}/>
                  </div>
                  <div className="pl-3">
                    <h5 className="mb-1 mt-2">Jason</h5>
                    <small className="d-block text-muted h5 font-weight-normal">
                      Bootstrap Themes
                    </small>
                  </div>
                </div>
                <p className="lead mb-2">
                  “As a DB guy, this template has made my life easy porting over
                  an old website to a new responsive version. I can focus more on
                  the data and less on the layout.”
                </p>
  
                <div className="landing-stars">
                  
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card tag="blockquote" className="border">
              <CardBody className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div>
                  <FontAwesomeIcon icon={faPencilAlt}/>
                  </div>
                  <div className="pl-3">
                    <h5 className="mb-1 mt-2">Richard</h5>
                    <small className="d-block text-muted h5 font-weight-normal">
                      Bootstrap Themes
                    </small>
                  </div>
                </div>
                <p className="lead mb-2">
                  “This template was just what we were after; its modern, works
                  perfectly and is visually beautiful , we couldn't be happier.
                  The support really is excellent, I look forward to working with
                  these guys for a long time to come!”
                </p>
  
                <div className="landing-stars">
                  
                </div>
              </CardBody>
            </Card>
          </Col>
          <Col md={6} lg={4}>
            <Card tag="blockquote" className="border">
              <CardBody className="p-4">
                <div className="d-flex align-items-center mb-3">
                  <div>
                  <FontAwesomeIcon icon={faPencilAlt}/>
                  </div>
                  <div className="pl-3">
                    <h5 className="mb-1 mt-2">Martin</h5>
                    <small className="d-block text-muted h5 font-weight-normal">
                      Bootstrap Themes
                    </small>
                  </div>
                </div>
                <p className="lead mb-2">
                  “I just began to test and use this theme and I can find that it
                  cover my expectatives. Good support from the developer.”
                </p>
  
                <div className="landing-stars">
                  
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );

  export default Tests;