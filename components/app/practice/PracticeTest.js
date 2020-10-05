import React, { useState, useEffect } from "react";
import { useQuery, useMutation, useLazyQuery } from "@apollo/react-hooks";
import { GET_USERTEST_RECORD } from "../../../lib/apiproxy/queries";
import { ADD_USER_TEST_RECORD } from "../../../lib/apiproxy/mutations";
//import { Link } from "react-router-dom";
import Question from "./Question"
import RoboSwitch from "./RoboSwitch"
import TestProgress from "./TestProgress";
import Timer from "./Timer";
import TestActionButtons from "./TestActionButtons";
import PracticeTestService from "../../../lib/apiproxy/practiceTestService";
import UserTestService from "../../../lib/apiproxy/userTestService";
import { useRouter } from "next/router";

import {
  Breadcrumb,
  BreadcrumbItem,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Container
} from "reactstrap";

import Header from "../../theme/Header";
import HeaderTitle from "../../theme/HeaderTitle";
import QuestionService from "../../../lib/apiproxy/questionService";

const PracticeTest = (props) => {
  const [currentQuestionIndex, setcurrentQuestionIndex] = useState(0);
  const router = useRouter();

  const [progressData, setProgressData] = useState({
    percentage: 0,
    description: "",
    nextQuestionIndex: 0
  });
  const [canProcced, setCanProcced] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [userAnswerText, setUserAnswerText] = useState("");
  const [questionImage, setQuestionImage] = useState();
  const [questionAudio, setQuestionAudio] = useState();
  const [textToSpeechMode, setTextToSpeechMode] = useState(false);

  const [getUserTestRecord] = useLazyQuery(GET_USERTEST_RECORD, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if (data.userTestRecord) {
        setCanProcced(true);
        setUserAnswer(data.userTestRecord.answerId);
        setUserAnswerText(data.userTestRecord.answerText);
      }
    },
  });

  const [addUserTestRecord] = useMutation(ADD_USER_TEST_RECORD, {
    onCompleted({ addUserTestRecord }) {
      getTestProgressInPercentage(props.userTestInstance.id);
    },
  });

  const incrementQuestionIndex = () => {
    if (currentQuestionIndex === props.userTestInstance.questions.length - 1) {
      //TODO: Refactoring needed  
      //history.push(`/practicepages/testresult/${props.userTestId}`);
      router.push(`/testresult/${props.userTestInstance.id}`);
    } else {
      setcurrentQuestionIndex(currentQuestionIndex + 1);
      setCanProcced(false);
    }
  };

  const decrementQuestionIndex = () => {
    setcurrentQuestionIndex(currentQuestionIndex - 1);
  };

  useEffect(() => {
    if (props.userTestInstance) {
      getUserTestRecord({
        variables: {
          userTestId: props.userTestInstance.id,
          questionId: props.userTestInstance.questions[currentQuestionIndex].id,
        },
      });
      loadQuestionImage(props.userTestInstance.questions[currentQuestionIndex]);
      loadQuestionAudio(props.userTestInstance.questions[currentQuestionIndex]);
    }
  }, [currentQuestionIndex]);

  // This is triggered only once at initial load
  useEffect(() => {
    console.log(props);
    if (props.userTestInstance) {
      console.log(props.userTestInstance);
      getUserTestRecord({
        variables: {
          userTestId: props.userTestInstance.id,
          questionId: props.userTestInstance.questions[currentQuestionIndex].id,
        },
      });
      getTestProgressInPercentage(props.userTestInstance.id).then((progress) => {
        if(progress.nextQuestionIndex == 0) {
          loadQuestionImage(props.userTestInstance.questions[0]);
          loadQuestionAudio(props.userTestInstance.questions[0]);      
        }
        else {
          setcurrentQuestionIndex(progress.nextQuestionIndex);
        }    

      });
    }
  }, []);

  const getTestProgressInPercentage = async (userTestIdInput) => {
    let response = await UserTestService.getTestProgressPercentage(userTestIdInput);
    setProgressData(response.data);
    return response.data;
  };

  const loadQuestionImage = (question) => {
    if (question.images.length > 0) {
      QuestionService.getQuestionImage(question.id).then((res) => {
        if (res.data) {
          setQuestionImage(
            `data:${res.data.fileType};base64, ${res.data.base64Data}`
          );
        } else {
          setQuestionImage(null);
        }
      });
    } else {
      setQuestionImage(null);
    }
  };

  const loadQuestionAudio = (question) => {
    if (question.audio.length > 0) {
      QuestionService.getQuestionAudio(question.id).then((res) => {
        if (res.data) {
          setQuestionAudio(
            `data:${res.data.fileType};base64, ${res.data.base64Data}`
          );
        } else {
          setQuestionAudio(null);
        }
      });
    } else {
      setQuestionAudio(null);
    }
  };

  const handleOnAnswered = (answer) => {
    if (answer.answerId) {
      setUserAnswer(answer.answerId);
      addUserTestRecord({
        variables: {
          userTestRecord: {
            userTestId: props.userTestInstance.id,
            questionId: props.userTestInstance.questions[currentQuestionIndex].id,
            answerId: answer.answerId,
            isCorrect: answer.isCorrect,
          },
        },
      });
      setCanProcced(true);
    } else if (answer.answerText) {
      PracticeTestService.postUserTestTextRecord({
        userTestId: props.userTestInstance.id,
        questionId: props.userTestInstance.questions[currentQuestionIndex].id,
        userAnswerText: answer.answerText,
      }).then((result) => {
        getTestProgressInPercentage(props.userTestInstance.id);
      });
      setCanProcced(true);
    } else {
      setCanProcced(false);
    }
  };

  const handleSpeechToTextToggle = () => {
    setTextToSpeechMode(textToSpeechMode ? false : true);
  };

  // if (loading) {
  //   return (
  //     <div>
  //       <p>Loading</p>
  //     </div>
  //   );
  // }

  // if (error) {
  //   return (
  //     <div>
  //       <p>Error loading test: {error}</p>
  //     </div>
  //   );
  // }

  //if (data) {
    return (
      <Container fluid>
        <Header>
          <HeaderTitle>Practice</HeaderTitle>
          <Breadcrumb>
            <BreadcrumbItem>
              {/* <Link to="/dashboard">Dashboard</Link> */}
            </BreadcrumbItem>
            <BreadcrumbItem active>Practice Test</BreadcrumbItem>
          </Breadcrumb>
        </Header>
        <Card>
          <CardHeader>
            <CardTitle tag="h5">
              {props.userTestInstance.test.text}{" "}
              <Timer minutes={props.userTestInstance.test.durationMinutes} />
              <RoboSwitch handleSpeechToTextToggle={handleSpeechToTextToggle} textToSpeechMode={textToSpeechMode}/>              
            </CardTitle>
          </CardHeader>
          <CardBody>
            <TestProgress progressData={progressData} />
            <Question
              question={props.userTestInstance.questions[currentQuestionIndex]}
              selectedAnswer={userAnswer}
              selectedAnswerText={userAnswerText}
              onAnswered={handleOnAnswered}
              questionImage={questionImage}
              questionAudio={questionAudio}
              shuffleSeed={props.userTestInstance.shuffleSeed}
              textToSpeechMode={textToSpeechMode}
            />
            <TestActionButtons
              currentQuestionIndex={currentQuestionIndex}
              totalQuestions={props.userTestInstance.questions.length}
              onNextClick={incrementQuestionIndex}
              onPreviousClick={decrementQuestionIndex}
              canProcced={canProcced}
            />
          </CardBody>
        </Card>
      </Container>
    );
  //}
};

export default PracticeTest;
