import React from "react";
import PracticeTest from "../../../components/app/practice/PracticeTest";
import Dashboard from "../../../components/layout/Dashboard";
import { useRouter } from "next/router";
import axiosClient from "../../../lib/apiproxy/axiosClient";
import { GET_USER_TEST_INSTANCE } from "../../../lib/apiproxy/queries";
import Head from "next/head";

import Layout from "../../../components/layout/Layout";

const TestInstance = (props) => {
  console.log(JSON.stringify(props));
  const router = useRouter();
  return (
    <Layout>
      <Head>
        <title>
          Practice 
        </title>
        <meta
          name="description"
          content=""
        />
      </Head>
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
