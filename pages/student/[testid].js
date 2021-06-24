import React, { useState } from "react";
import { useRouter } from "next/router";
import auth0 from "../../utils/auth0";
import axiosClient from "../../lib/apiproxy/axiosClient";
import { GET_USERS_BY_PARENT_ID } from "../../lib/apiproxy/queries";
import Layout from "../../components/layout/Layout";
import AddEditStudent from "../../components/app/AddEditStudent";
import Students from "../../components/app/Students";
import { CREATE_TEST } from "../../lib/apiproxy/mutations";

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

const ProfileSelection = (props) => {
  const router = useRouter();
  //const[userTestInstance, setUserTestInstance] = useState();

  const handleStudentSelection = async (studentId) => {
    const response = await axiosClient.PostQuery(CREATE_TEST, {
      userTest: {
        testId: props.testId,
        userId: studentId,
        mode: "practice",
      },
    });

    router.push(`/practice/${studentId}/${response.data.addUserTest.id}`);
  };

  return (
    <Layout>
      <Container fluid>
        <Row>
          <Col>
            <Card>
              <CardHeader>
                <CardTitle tag="h5" className="mb-0">
                  {props.studentProfiles?.length > 0 ? "Select" : "Create"}{" "}
                  Student/Child Profile
                </CardTitle>
              </CardHeader>
              <CardBody>
                {props.studentProfiles?.length > 0 ? (
                  <Students
                    studentProfiles={props.studentProfiles}
                    parentUserId={props.parentUserId}
                    testId={props.testId}
                    studentSelected={handleStudentSelection}
                  />
                ) : (
                  <AddEditStudent parentUserId={props.parentUserId} />
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { testid } = context.query;
  console.log(`Test id is ${testid}`);
  const session = await auth0.getSession(context.req);
  if (session) {
    console.log(`Session is available`);
    const response = await axiosClient.PostQuery(GET_USERS_BY_PARENT_ID, {
      parentUserId: session.user.userId,
    });

    return {
      props: {
        studentProfiles: response.data.usersByParentId,
        parentUserId: session.user.userId,
        testId: testid,
      },
    };
  } else {
    console.log(`Session isn't available`);
    // can't create the student profile if not logged in
    context.res.writeHead(307, {
      Location: `/api/login?redirectTo=/student/${testid}`,
    });
    context.res.end();
    return { props: {}};
  }
}

export default ProfileSelection;
