import React from "react";
import Result from "../../components/app/practice/Result";
import Layout from "../../components/layout/Layout";

const TestResult = (props) => {
    return <Layout forPractice="true"><Result testInstanceId={props.testInstanceId}/></Layout>;
}

export function getServerSideProps(context) {
    const { testinstanceid } = context.query;
    
    return {
      props: { testInstanceId: testinstanceid }
    };
}

export default TestResult;