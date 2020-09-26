import React from "react";
import Dashboard from "../../components/layout/Dashboard";
import TestList from "../../components/app/TestList";

const ContentHome = () =>(
     <TestList/>
);

ContentHome.layout = Dashboard;

export default ContentHome;