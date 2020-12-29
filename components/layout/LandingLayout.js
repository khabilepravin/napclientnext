import React from "react";
import Intro from "./Intro";
import AppHeader from "./AppHeader";
import Footer from "./Footer";

const LandingLayout = (props) => {
  console.log(props.user);
  return (
    <>
      <AppHeader user={props.user} />
      <Intro />
      {props.children}
      <Footer />
    </>
  );
};

export default LandingLayout;
