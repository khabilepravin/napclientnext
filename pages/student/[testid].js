import React from "react";
import auth0 from "../../utils/auth0";
import axiosClient from "../../lib/apiproxy/axiosClient";
import { GET_USERS_BY_PARENT_ID } from "../../lib/apiproxy/queries";
import Layout from "../../components/layout/Layout";
import AddEditStudent  from "../../components/app/AddEditStudent";

import {
  Container,
  Col,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  Row,
  Button,
} from "reactstrap";

const Students = (props) => {
  
  return <Layout>
    <Container fluid>
      <Row>
        <Col>
          <Card>
            <CardHeader>
              <CardTitle tag="h5" className="mb-0">
                {props.studentProfiles?.length > 0 ? "Select" : "Create"} Student/Child Profile
              </CardTitle>
            </CardHeader>
            <CardBody>
              {props.studentProfiles?.length > 0 ? (
                props.studentProfiles.map((student) => {
                  return <Button>{student.firstName}</Button>
                })
              ) : (
               <AddEditStudent parentUserId={props.parentUserId}/>
              )}
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  </Layout>
};

export async function getServerSideProps(context) {
  const { testid } = context.query;
  const session = await auth0.getSession(context.req);
  if (session) {
    const response = await axiosClient.PostQuery(GET_USERS_BY_PARENT_ID, {
      parentUserId: session.user.userId,
    });

    return { props: { studentProfiles: response.data.usersByParentId, parentUserId: session.user.userId } };
  } else {
    return { props: {} };
  }
}

export default Students;
