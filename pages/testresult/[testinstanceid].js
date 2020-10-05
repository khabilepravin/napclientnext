import React from "react";
import Dashboard from "../../components/layout/Dashboard";
import Result from "../../components/app/practice/Result";

const TestResult = (props) => {
    return <Result testInstanceId={props.testInstanceId}/>;
}

TestResult.layout = Dashboard;  

export function getServerSideProps(context) {
    const { testinstanceid } = context.query;
    
    return {
      props: { testInstanceId: testinstanceid }
    };
}

export default TestResult;