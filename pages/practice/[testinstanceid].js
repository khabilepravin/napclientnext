import React from "react";
import PracticeTest from "../../components/app/practice/PracticeTest";
import Dashboard from "../../components/layout/Dashboard";
import { useRouter } from "next/router";

const Practice = () => {
    const router = useRouter();
    const {testinstanceid} = router.query;
    //return <h1> hello world {testinstanceid}</h1>
    return <PracticeTest userTestId={testinstanceid}/>
}

Practice.layout = Dashboard;


export default Practice;