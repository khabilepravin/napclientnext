import React from "react";
import PracticeTest from "../../components/app/practice/PracticeTest";
import Dashboard from "../../components/layout/Dashboard";
import { useRouter } from "next/router";
import { GET_USER_TEST_INSTANCE } from "../../lib/apiproxy/queries";
import axiosClient from "../../lib/apiproxy/axiosClient";

const Practice = (props) => {
    const router = useRouter();
    console.log(props);
   // const {testinstanceid} = router.query;
    return <PracticeTest userTestInstance={props.userTestById}/>
}

Practice.layout = Dashboard;

export async function getServerSideProps(context) {
    const { testinstanceid } = context.query;
    
    const response = await axiosClient.PostQuery(`query($id: ID!){
        userTestById(id:$id){
          id
          testId
          shuffleSeed
          test{
            text
            description
            subject
            year
            durationMinutes
          }
          questions{
            id
            text
            description
            questionType   
            images{
              fileId
            }
            audio{
              fileId
            }
          }
        }
      }`,
      {
        id: testinstanceid
      }
    );
    //console.log(response.data.data);
    return {
      props: response.data.data,
    };
}

export default Practice;