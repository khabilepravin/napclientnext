import React from "react";
import { useRouter } from "next/router";
import { GET_TESTS_BY_TYPE_AND_YEAR } from "../../../lib/apiproxy/queries";
import axiosClient from "../../../lib/apiproxy/axiosClient";
import Tests from "../../../components/app/Tests";
import Layout from "../../../components/layout/Layout";
import Head from "next/head";
import {
  Container,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
} from "reactstrap";
import auth0 from "../../../utils/auth0";

const PracticeTest = (props) => {
  const router = useRouter();
  const { testtype, year } = router.query;
  
  
  return (
    <Layout childPage="true">
      <Head>
        <title>Practice {testtype} style tests for year {year}</title>
        <meta name="description" content={`Practice ${testtype} for year ${year}`}/>
      </Head>
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
  const session = await auth0.getSession(context.req);
  
  const response = await axiosClient.PostQuery(GET_TESTS_BY_TYPE_AND_YEAR, {
    testType: testtype,
    year: year,
  });
  return {
    props: response,
  };
}

export default PracticeTest;
