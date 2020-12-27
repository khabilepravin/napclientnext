import React, { useEffect, useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { DELETE_QUESTION } from "../../../lib/apiproxy/mutations";
import { showToastr } from "../../../utils/themeService";

import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container,
  Button,
} from "reactstrap";

import Header from "../../../components/theme/Header";  //"../../../components/themecomponents/Header";
import HeaderTitle from "../../../components/theme/HeaderTitle";

import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import { GET_QUESTIONS } from "../../../lib/apiproxy/queries";
import QuestionAdd from "../../../components/app/QuestionAdd";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/Layout";

const QuestionsList = () => {
  const router = useRouter();
  const { testid } = router.query;
  const [questions, setQuestions] = useState([]);
  const[selectedQuestion, setSelectedQuestion] = useState();

  const [getTestQuestionsQuery, { called, loading }] = useLazyQuery(
    GET_QUESTIONS,
    {
      onCompleted: (data) => {
        setQuestions(data.questions);
      },
      fetchPolicy: "no-cache",
    }
  );

  const [deleteQuestion] = useMutation(DELETE_QUESTION,{
    onCompleted:(data)=>{
      showToastr("Success", "Question deleted successfully");
      getTestQuestionsQuery({ variables: { testId: testid } });
      setSelectedQuestion(null);
    }});


  const handleQuestionAdded = () => {
    getTestQuestionsQuery({ variables: { testId: testid } });
    setSelectedQuestion(null);
  };

  const handleQuestionEdit = (question) => {
    setSelectedQuestion(question);
    let nameFormElement = document.getElementsByTagName('form')[0];
     if(nameFormElement){
       nameFormElement.scrollIntoView({behavior: "smooth"});
     }
  };

  const handleQuestionDelete = (id) =>{
    deleteQuestion({ variables: { id: id } });   
  };

  useEffect(() => {
    console.log(`this is the test ${testid}`);
    getTestQuestionsQuery({ variables: { testId: testid } });
  }, []);

  const tableColumns = [
    {
      dataField: "id",
      text: "Id",
      hidden: true,
    },
    {
      dataField:"questionType",
      text:"Type",
      hidden:true
    },
    {
      dataField: "plainText",
      text: "Text",
      sort: true,
    },
    {
      dataField: "description",
      text: "Question",
      sort: true,
    },
    {
      text: "Actions",
      dataField: "",
      formatter: (cell, row, rowIndex) => (
        <>
          <Button
            onClick={() => handleQuestionEdit(row)}
          >
            Edit
          </Button>
          <span> </span>
          <Button
            onClick={() => router.push(`/content/answers/${row.id}`)}
          >
            Answers
          </Button>
          <span> </span>
          <Button color="danger"
            onClick={() => handleQuestionDelete(row.id)}
          >
            Delete
          </Button>
        </>
      ),
    },
  ];

  if (loading) {
    return (
      <div>
        <p>Loading</p>
      </div>
    );
  }

  if (!called) {
    return (
      <div>
        <p>Was never called</p>
      </div>
    );
  }
  return (
    <Layout><Container fluid>
      <Header>
        <HeaderTitle>Questions</HeaderTitle>
        <Breadcrumb>
          <BreadcrumbItem>
            {/* <Link to="/dashboard">Dashboard</Link> */}
          </BreadcrumbItem>
          <BreadcrumbItem active>Questions</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">Add/Edit Question</CardTitle>
        </CardHeader>
        <CardBody>
          <QuestionAdd 
          testId={testid} 
          questionAdded={handleQuestionAdded} 
          editedQuestion={selectedQuestion}/>
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">List of Questions</CardTitle>
        </CardHeader>
        <CardBody>
          <BootstrapTable
            keyField="id"
            data={questions}
            columns={tableColumns}
            bootstrap4
            bordered={false}
            pagination={paginationFactory({
              sizePerPage: 25,
              sizePerPageList: [5, 10, 25, 50],
            })}
          />
        </CardBody>
      </Card>
    </Container>
    </Layout>
  );
};

// export function getServerSideProps(context) {
//   const { testid } = context.query;
  
//   return {
//     props: { testId: testid }
//   };
// }

export default QuestionsList;
