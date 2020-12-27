import React, { useState, useEffect } from "react";
import { GET_ANSWERS } from "../../../lib/apiproxy/queries";
import { DELETE_ANSWER } from "../../../lib/apiproxy/mutations";
import AnswerAdd from "../../../components/app/AnswerAdd";
import { showToastr } from "../../../utils/themeService";
import { useRouter } from "next/router";
import Layout from "../../../components/layout/Layout";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";

import {Link} from "next/link";

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

import Header from "../../../components/theme/Header"; 
import HeaderTitle from "../../../components/theme/HeaderTitle";

import BootstrapTable from "react-bootstrap-table-next";

const AnswersList = () => {
  const router = useRouter();
  const { questionid } = router.query;

  const [question, setQuestion] = useState();
  const [selectedAnswer, setSelectedAnswer] = useState();

  const [getAnswers, { called, loading }] = useLazyQuery(GET_ANSWERS, {
    onCompleted: (data) => {
      setQuestion(data.question);
    },
    fetchPolicy: "no-cache",
  });

  useEffect(() => {
    getAnswers({ variables: { questionId: questionid } });
  }, []);

  const [deleteAnswer] = useMutation(DELETE_ANSWER,{
    onCompleted:(data)=>{
      showToastr("Success", "Answer deleted successfully");
      getAnswers({ variables: { questionId: questionid } });
    }});

  const deleteAnswerHandler = (id) => {
    deleteAnswer({ variables: { id: id } });   
  };

  const editAnswerHandler = (answer) => {
     setSelectedAnswer(answer);
     let nameFormElement = document.getElementsByTagName('form')[0];
     if(nameFormElement){
       nameFormElement.scrollIntoView({behavior: "smooth"});
     }
  };

  const handleAnswerSaved = () => {
    setSelectedAnswer(null);
    getAnswers({ variables: { questionId: questionid } });
  };

  const tableColumns = [
    {
      dataField: "id",
      text: "Id",
      hidden: true,
    },
    {
      dataField: "text",
      text: "Text",
      sort: true,
    },
    {
      dataField: "description",
      text: "Description",
      sort: true,
    },
    {
      dataField: "isCorrect",
      text: "Is Correct",
      sort: true,
    },
    {
      text: "Actions",
      dataField: "",
      formatter: (cell, row, rowIndex) => (
        <>
          <Button onClick={() => editAnswerHandler(row)}>Edit</Button>
          <> </>
          <Button onClick={() => deleteAnswerHandler(row.id)}>Delete</Button>
        </>
      ),
    },
  ];

  if (!called) {
    return (
      <div>
        <p>Was never called</p>
      </div>
    );
  }

  if (loading) {
    return <h3>Loading...</h3>;
  }

  return (
    <Layout>
        <Container fluid>
      <Header>
        <HeaderTitle>Answers List</HeaderTitle>
        <Breadcrumb>
          <BreadcrumbItem>
            {/* <Link to="/dashboard">Dashboard</Link> */}
          </BreadcrumbItem>
          <BreadcrumbItem active>Answers List</BreadcrumbItem>
        </Breadcrumb>
      </Header>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">
            Add/Edit answers for: {question && question.plainText}
          </CardTitle>
        </CardHeader>
        <CardBody>
          <AnswerAdd
            questionId={questionid}
            editingAnswer={selectedAnswer}
            onAnswerSaved={handleAnswerSaved}
          />
        </CardBody>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle tag="h5">List of Answers</CardTitle>
        </CardHeader>
        <CardBody>
          <BootstrapTable
            keyField="id"
            data={question ? question.answers : []}
            columns={tableColumns}
            bootstrap4
            bordered={false}
          />
        </CardBody>
      </Card>
    </Container>
    </Layout>
  );
};

export default AnswersList;
