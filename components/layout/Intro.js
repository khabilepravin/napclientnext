import React from "react";
import { Container, Row, Col } from "reactstrap";

const Intro = () => (
    <section className="pt-7 pb-5 landing-bg text-white overflow-hidden">
      <Container className="py-4">
        <Row>
          <Col xl={11} className="mx-auto">
            <Row>
              <Col md={12} xl={8} className="mx-auto text-center">
                <div className="d-block my-4">
                  <h1 className="display-4 font-weight-bold mb-3 text-white">
                    Comprehensive NAPLAN and ICAS style tests for primary students
                  </h1>
                  <p className="lead font-weight-light mb-3 landing-text">
                                      Hunderds of tests with score tracking and automatic shuffling of questions and answers.
                                      Resume where you left of from any device, keeps track of your progress.
                                      </p>
                  
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </section>
  );
  
  export default Intro;