import React, { useState, useEffect } from "react";
import { CustomInput } from "reactstrap";
import Image from "./Image";
import AnswerService from "../../../lib/apiproxy/answerService";
import { Input } from "reactstrap";
import Audio from "./Audio";

const Answers = React.memo((props) => {
  const [answerImages, setAnswerImages] = useState();
  const [answerAudioFiles, setAnswerAudioFiles] = useState();

  useEffect(() => {
    if (props.answerContext) {
      if (props.answerContext.answers.length > 0) {
        let answerIds = props.answerContext.answers
          .map((answer) => {
            return answer.id;
          })
          .join(",");

        // Figure out whether answer contains image/text (Assumption is it can only be of one type)
        if (answerIds) {
          if (props.answerContext.answers[0].text !== '' && props.textToSpeechMode) {
            loadAnswerAudio(answerIds);
          } else {
            AnswerService.getAnswerImages(answerIds).then(
              (answerImagesResponse) => {
                setAnswerImages(answerImagesResponse.data);
              }
            );
          }
        }
      }
    }
  }, [props.answerContext]);

  useEffect(() => {
    if (props.answerContext && props.textToSpeechMode) {
      let answerIds = props.answerContext.answers
          .map((answer) => {
            return answer.id;
          }).join(",");

      if (props.answerContext.answers[0].text !== '' && props.textToSpeechMode){
        loadAnswerAudio(answerIds);
      }
    }
  }, [props.textToSpeechMode]);

  const loadAnswerAudio = (answerIds) => {
    AnswerService.getAnswerAudioFiles(answerIds).then(
      (answerAudioFilesResponse) => {
         setAnswerAudioFiles(answerAudioFilesResponse.data); 
      }
    );
  };

  // Returns a function, that, as long as it continues to be invoked, will not
  // be triggered. The function will be called after it stops being called for
  // `wait` milliseconds.
  const debounce = (func, wait) => {
    let timeout;

    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        func(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  };

  const answerEnteredDebounce = debounce((e) => {
    props.onAnswerSelected({ answerText: e });
  }, 1000);

  const handleInputEntered = (e) => {
    //setUserAnswerText(e.target.value);
    answerEnteredDebounce(e.target.value);
  };

  const handleOnAnswerImageClicked = (clickedImageAnswer) => {
    document.getElementById(clickedImageAnswer.id).checked = true;
    props.onAnswerSelected({
      answerId: clickedImageAnswer.id,
      isCorrect: clickedImageAnswer.isCorrect,
    });
  };

  if (props.answerContext) {
    if (props.answerContext.questionType === "single") {
      const divStyle = {
        display: "flex",
      };
      let answersList = props.answerContext.answers.map((answer) => {
        let answerImage =
          answerImages &&
          answerImages.find(({ answerId }) => answerId === answer.id);
        let answerImageSrc = null;
        if (answerImage) {
          answerImageSrc = `data:${answerImage.fileType};base64, ${answerImage.base64Data}`;
        }

        let answerAudio = answerAudioFiles && answerAudioFiles.find(({ answerId }) => answerId === answer.id);
        let answerAudioSrc = null;
        if(answerAudio){
           answerAudioSrc = `data:${answerAudio.fileType};base64, ${answerAudio.base64Data}`; 
        }  

        return (
          <div key={answer.id} style={divStyle}>
            <CustomInput
              type="radio"
              id={answer.id}
              name="answers"
              label={answer.text}
              className="mb-2 h4"
              onChange={() =>
                props.onAnswerSelected({
                  answerId: answer.id,
                  isCorrect: answer.isCorrect,
                })
              }
              value={props.answerContext.answerId}
              checked={props.selectedAnswer === answer.id}
            >
              <Image
                imageSource={answerImageSrc}
                imageEntity={answer}
                onImageClicked={handleOnAnswerImageClicked}
              />
            </CustomInput>
            &nbsp;<Audio audioSource={answerAudioSrc} 
                  identifier={answer.id}
                  textToSpeechMode={props.textToSpeechMode}/>
          </div>
        );
      });

      return <>{answersList}</>;
    } else if (props.answerContext.questionType === "text") {
      return (
        <Input
          type="text"
          placeholder="Answer here"
          onKeyUp={handleInputEntered}
          defaultValue={props.selectedAnswerText}
        />
      );
    }
  } else {
    return <>Loading...</>;
  }
});

export default Answers;
