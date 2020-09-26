import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import ReactQuill,{Quill} from "react-quill";
import { Form, FormGroup, Input, Label, Button } from "reactstrap";
import { showToastr } from "../../services/themeService";

import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const schema = Yup.object().shape({
  testId: Yup.string().required("TestId is required"),
  questionType: Yup.string().required("Question Type is required"),
});

const QuestionAdd = React.memo((props) => {
  const [testId, setTestId] = useState(props.testId);
  const [questionText, setQuestionText] = useState('');
  const [imageFile, setImageFile] = useState();  
  const [isInProgress, setIsInprogress] = useState(false);

  useEffect(() => {
    if(props.editedQuestion) {
      setQuestionText(props.editedQuestion.text);
    }
  }, [props.editedQuestion]);

  const { register, handleSubmit, reset, errors } = useForm({
    validationSchema: schema,
  });

  const onSubmit = (data) => {
    if (!questionText) {
      showToastr("Danger", "Question Text is required");
    }

    data.text = questionText;
    submitQuestionForm(data);
  };

  const submitQuestionForm = (data) => {
    setIsInprogress(true);
    let formData = new FormData();

    if(props.editedQuestion){
      data.id = props.editedQuestion.id;
    }

    formData.set("question", JSON.stringify(data));
    if (imageFile) {
      formData.append("imageFile", imageFile);
    }

    if (props.editedQuestion) {
      axios
        .put(`${process.env.REACT_APP_REST_API_ENDPOINT}/question`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status !== 500) {
            reset();
            showToastr("Success", "Question updated successful");
            props.questionAdded();
            setIsInprogress(false);
          }
        });
    } else {
      axios
        .post(`${process.env.REACT_APP_REST_API_ENDPOINT}/question`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status !== 500) {
            reset();
            showToastr("Success", "Question added successful");
            props.questionAdded();
            setIsInprogress(false);
          }
        });
    }
  };

  const onImageAttached = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>Question Text</Label>
        <ReactQuill
          placeholder="Question Text"
          id="text"
          name="text"
          value={questionText}
          onChange={setQuestionText}
        />
      </FormGroup>
      <FormGroup>
        <Label>Question Type</Label>
        <Input
          type="select"
          id="questionTypeSelect"
          name="questionType"
          className="mb-3"          
          innerRef={register}
          value={props.editedQuestion && props.editedQuestion.questionType}>
          <option value="questionType">Question Type</option>
          <option value="single">Single Select</option>
          <option value="text">Text</option>
        </Input>
        {errors.questionType && (
          <p className="text-danger">{errors.questionType.message}</p>
        )}
      </FormGroup>
      <FormGroup>
        <Label>Actual Question</Label>
        <Input
          type="textarea"
          id="description"
          name="description"
          className="mb-3"
          defaultValue={
            props.editedQuestion && props.editedQuestion.description
          }
          innerRef={register}
        ></Input>
      </FormGroup>
      <FormGroup>
        <Label>Image</Label>
        <Input
          type="file"
          id="imageFile"
          onChange={onImageAttached}
          name="imageFile"
        />
      </FormGroup>
      <Input
        type="hidden"
        id="testId"
        name="testId"
        value={testId}
        innerRef={register}
      ></Input>
      <Input
        type="hidden"
        id="id"
        name="id"
        defaultValue={props.editedQuestion && props.editedQuestion.id}
      ></Input>
      <Button
        type="submit"
        color="primary"
        className="mr-1 mb-1"
        disabled={isInProgress}
      >
        <FontAwesomeIcon icon={faSave} /> Save and Reset
      </Button>
    </Form>
  );
});

export default QuestionAdd;
