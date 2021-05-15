import React from "react";
import PracticeTest from "../../components/app/practice/PracticeTest";
import Dashboard from "../../components/layout/Dashboard";
import { useRouter, Router } from "next/router";
import axiosClient from "../../lib/apiproxy/axiosClient";
import { GET_USER_TEST_INSTANCE } from "../../lib/apiproxy/queries";
import auth0 from "../../utils/auth0";
import { CREATE_TEST } from "../../lib/apiproxy/mutations";
import Layout from "../../components/layout/Layout";

const Practice = (props) => {
  const router = useRouter();
  return (
    <Layout>
      <PracticeTest userTestInstance={props.userTestById} />
    </Layout>
  );
};

Practice.layout = Dashboard;

export async function getServerSideProps(context) {
  const { testid } = context.query;
  const session = await auth0.getSession(context.req);
  if (session) {

    // User has signed in using social
    // Check if they have student/child profiles created
    // If Yes , show student profile selection
    // If No, Show student profile creation logic

    //TODO: See if these two can be combined into one
    const response = await axiosClient.PostQuery(CREATE_TEST, {
      userTest: {
        testId: testid,
        userId: session.user.userId,
        mode: "practice",
      },
    });
    const userTestInstanceResponse = await axiosClient.PostQuery(
      GET_USER_TEST_INSTANCE,
      {
        id: response.data.addUserTest.id,
      }
    );
    return {
      props: userTestInstanceResponse.data,
    };
  } else {
    // can't start the test if not logged in
    context.res.writeHead(307, {
      Location: `/api/login?redirectTo=/student/${testid}`,
    });
    context.res.end();
    return;
  }
}

export default Practice;
