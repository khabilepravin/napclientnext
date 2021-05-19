import React from "react";
import Head from "next/head";
import auth0 from "../utils/auth0";
import TestTypes from "../components/app/TestTypes";
import LandingLayout from "../components/layout/LandingLayout";

const Landing = (props) => {
  return (
    <LandingLayout user={props.user}>
      <Head>
        <title>NAPLAN, ICAS and Opportunity Class Style tests for primary level students</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="Ultimate destination for students to practice NAPLAN, ICAS and Opportunity Class Style tests" />
      </Head>
      <TestTypes />
    </LandingLayout>
  );
};

export async function getServerSideProps(context) {
  const session = await auth0.getSession(context.req);
  if (session) {
    return { props: { user: session.user } };
  } else {
    return { props: {} };
  }
}

export default Landing;
