import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faPlay } from "@fortawesome/free-solid-svg-icons";
import axiosClient from "../../lib/apiproxy/axiosClient";
import { CREATE_TEST } from "../../lib/apiproxy/mutations";
import { v4 as uuidv4 } from 'uuid';
import { useRouter } from "next/router";
import localAuth from "../../utils/localAuth";

import {
  Container,
  Col,
  Card,
  Row,
  CardBody,
  CardHeader,
  Button,
} from "reactstrap";


const Tests = (props) => {
   const router = useRouter();
   const handleStartPractice = async (testId) => {    
    router.push(`/practice/${testId}`);
  };

  let availableTests = null;
  if (props.testList) {
    availableTests = props.testList.testsByTypeAndYear.map((test) => {
      return (
        <Col md={6} lg={4} key={test.id}>
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

              <Button
                color="secondary"
                className="mr-1 mb-1"
                onClick={() => handleStartPractice(test.id)}>
                <FontAwesomeIcon icon={faPlay} /> Start
              </Button>
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
