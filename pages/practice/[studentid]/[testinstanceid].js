import React from "react";
import PracticeTest from "../../../components/app/practice/PracticeTest";
import Dashboard from "../../../components/layout/Dashboard";
import { useRouter } from "next/router";
import axiosClient from "../../../lib/apiproxy/axiosClient";
import { GET_USER_TEST_INSTANCE } from "../../../lib/apiproxy/queries";

import Layout from "../../../components/layout/Layout";

const TestInstance = (props) => {
  const router = useRouter();
  return (
    <Layout>
      <PracticeTest userTestInstance={props.userTestById} />
    </Layout>
  );
};

TestInstance.layout = Dashboard;

export async function getServerSideProps(context) {
 const { testinstanceid } = context.query;
 const userTestInstanceResponse = await axiosClient.PostQuery(
      GET_USER_TEST_INSTANCE,
      {
        id: testinstanceid,
      }
    );

    return {
      props: userTestInstanceResponse.data,
    };
}

export default TestInstance;
