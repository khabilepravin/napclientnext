import React from "react";
import PracticeTest from "../../components/app/practice/PracticeTest";
import Dashboard from "../../components/layout/Dashboard";
import { useRouter } from "next/router";
import axiosClient from "../../lib/apiproxy/axiosClient";
import { GET_USER_TEST_INSTANCE } from "../../lib/apiproxy/queries";

const Practice = (props) => {
    const router = useRouter();
    return <PracticeTest userTestInstance={props.userTestById}/>
}

Practice.layout = Dashboard;

export async function getServerSideProps(context) {
    const { testinstanceid } = context.query;
    
    const response = await axiosClient.PostQuery(GET_USER_TEST_INSTANCE,
      {
        id: testinstanceid
      }
    );
    return {
      props: response.data.data,
    };
}

export default Practice;