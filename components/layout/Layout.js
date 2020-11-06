import React from "react";
import Intro from "./Intro";
import AppHeader from "./AppHeader";
import Footer from "./Footer";

import Wrapper from "../theme/Wrapper";
import Main from "../theme/Main";
import Navbar from "../theme/Navbar";
import Content from "../theme/Content";


const Layout = (props) => {
  if (props.forPractice) {
    return (
      <>
      <Wrapper>     
        <Main>
          <Navbar />
          <Content>{props.children}</Content>
          <Footer />
        </Main>     
      </Wrapper>
    </>
    );
  } else {
    return (
      <>
        <AppHeader />
        <Intro />
        {props.children}
        <Footer />
      </>
    );
  }
};

export default Layout;
