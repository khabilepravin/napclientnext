import React from "react";
import auth0 from "../utils/auth0";
import TestTypes from "../components/app/TestTypes";
import LandingLayout from "../components/layout/LandingLayout";

const Landing = (props) => {
  return (
    <LandingLayout user={props.user}>
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
