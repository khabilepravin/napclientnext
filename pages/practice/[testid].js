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
    return <Layout forPractice="true"><PracticeTest userTestInstance={props.userTestById}/></Layout>
}

Practice.layout = Dashboard;

export async function getServerSideProps(context) {
    const { testid } = context.query;
    const session = await auth0.getSession(context.req);
    if(session) {      
      // See if these two can be combined into one
      const response = await axiosClient.PostQuery(CREATE_TEST, { userTest: { testId: testid, userId: session.user.userId, mode: 'practice' } });
      const userTestInstanceResponse = await axiosClient.PostQuery(GET_USER_TEST_INSTANCE,
      {
          id: response.data.data.addUserTest.id
      });
      return {
        props: userTestInstanceResponse.data.data,
      };      
    }
    else { // can't start the test if not logged in
      context.res.writeHead(307, {Location: `/api/login?redirectTo=/practice/${testid}`});
      context.res.end();
      return;
    }   
}

export default Practice;