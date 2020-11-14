import React from "react";
import TestList from "../../components/app/TestList";
import Layout from "../../components/layout/Layout";

const ContentHome = () =>(
     <Layout childPage="true">
          <TestList/>
     </Layout>
);

export default ContentHome;