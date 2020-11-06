import React from "react";

import Wrapper from "../theme/Wrapper";
//import Sidebar from "../theme/Sidebar";
import Main from "../theme/Main";
import Navbar from "../theme/Navbar";
import Content from "../theme/Content";
import Footer from "../theme/Footer";

const Dashboard = ({  children }) => (
  <React.Fragment>
    <Wrapper>     
      <Main>
        <Navbar />
        <Content>{children}</Content>
        <Footer />
      </Main>     
    </Wrapper>
  </React.Fragment>
);

export default Dashboard;
