import React from "react";
import { useRouter } from "next/router";
import Dashboard from "../../../components/layout/Dashboard";
import { GET_TESTS_BY_TYPE_AND_YEAR } from "../../../lib/apiproxy/queries";
import axiosClient from "../../../lib/apiproxy/axiosClient";
import Tests from "../../../components/app/Tests";
import Layout from "../../../components/layout/Layout";
import {
  Container,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
} from "reactstrap";

const PracticeTest = (props) => {
  const router = useRouter();
  return (
    <Layout childPage="true">
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h5" className="mb-0">
                  Practice
                </CardTitle>
              </CardHeader>
              <CardBody>
                <Tests testList={props.data} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { testtype } = context.query;
  const { year } = context.query;

  const response = await axiosClient.PostQuery(GET_TESTS_BY_TYPE_AND_YEAR, {
    testType: testtype,
    year: year,
  });
  return {
    props: response.data,
  };
}

export default PracticeTest;
