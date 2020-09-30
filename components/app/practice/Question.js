import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/react-hooks";
import Answers from "./Answers";
import Image from "./Image";
import Audio from "./Audio";
import { GET_ANSWERS } from "../../../lib/apiproxy/queries";

const Question = React.memo((props) => {
  const[answerContext, setAnswerContext] = useState();
  const [getAnswers] = useLazyQuery(GET_ANSWERS, {
    fetchPolicy: "network-only",
    onCompleted: (data) => {
      if(data.question){
          setAnswerContext(data.question);
      }
    },
  });

  useEffect(() => {
    getAnswers({
      variables:{
        questionId: props.question.id,
        shuffleSeed: props.shuffleSeed
      }
    });
  }, [props.question]);

  const answerSelected = (answer) => {
    props.onAnswered(answer);
  };

  return (
    <>
      <h3 dangerouslySetInnerHTML={{ __html: props.question.text }}></h3>
      <Image imageSource={props.questionImage} />
      <h3>{props.question.description}</h3>
      <Audio audioSource={props.questionAudio} 
            identifier={props.question.id}
            textToSpeechMode={props.textToSpeechMode}/>
      <Answers
        answerContext={answerContext}
        selectedAnswer={props.selectedAnswer}
        selectedAnswerText={props.selectedAnswerText}
        onAnswerSelected={answerSelected}
        textToSpeechMode={props.textToSpeechMode}
      />      
    </>
  );
});

export default Question;
