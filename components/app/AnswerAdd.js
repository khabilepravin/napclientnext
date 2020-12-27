import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import axios from "axios";
import { showToastr } from  "../../utils/themeService";
import { Form, FormGroup, Input, Label, Button, CustomInput } from "reactstrap";

import { faSave } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const schema = Yup.object().shape({
  questionId: Yup.string().required("QuestionId is required") 
});

const AnswerAdd = (props) => {
  const [questionId, setQuestionId] = useState(props.questionId);
  const [imageFile, setImageFile] = useState();
  const [isInProgress, setIsInProgress] = useState(false);

  const { register, handleSubmit, reset, errors } = useForm({
    validationSchema: schema,
  });
  const onSubmit = (data) => {
    submitAnswerForm(data);
  };

  const onImageAttached = (e) => {
    setImageFile(e.target.files[0]);
  };

  const submitAnswerForm = (data) => {
    setIsInProgress(true);
    let formData = new FormData();

    if(props.editingAnswer) {
      data.id = props.editingAnswer && props.editingAnswer.id;
    }
    
    formData.set("answer", JSON.stringify(data));
    formData.append("imageFile", imageFile);

    if (props.editingAnswer) {
      formData.append("id", props.editingAnswer.id);
      axios
        .put(`${process.env.REACT_APP_REST_API_ENDPOINT}/answer`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          if (response.status !== 500) {
            reset();
            showToastr("Success", "Answer updated successfully");
            props.onAnswerSaved();
            setIsInProgress(false);
            setQuestionId(props.questionId);
          }
        });
    } else {
        axios
        .post(`${process.env.REACT_APP_REST_API_ENDPOINT}/answer`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          console.log(response);
          if (response.status !== 500) {
            reset();
            showToastr("Success", "Answer added successfully");
            props.onAnswerSaved();
            setIsInProgress(false);
            setQuestionId(props.questionId);
          }
        });
    }
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>Answer</Label>
        <Input
          type="text"
          name="text"
          placeholder="Name"
          innerRef={register}
          defaultValue={props.editingAnswer && props.editingAnswer.text}
        />
        {errors.text && <p className="text-danger">{errors.text.message}</p>}
      </FormGroup>
      <FormGroup>
        <Label>Description</Label>
        <Input
          type="textarea"
          id="description"
          name="description"
          className="mb-3"
          defaultValue={props.editingAnswer && props.editingAnswer.description}
          innerRef={register}
        ></Input>
        {errors.description && (
          <p className="text-danger">{errors.description.message}</p>
        )}
      </FormGroup>
      <FormGroup>
        <CustomInput
          type="checkbox"
          id="isCorrect"
          name="isCorrect"
          label="Is The Right Answer"
          innerRef={register}
          defaultChecked={props.editingAnswer && props.editingAnswer.isCorrect}
          className="mb-2"
        />
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
        id="questionId"
        name="questionId"
        value={questionId}
        innerRef={register}
      ></Input>
      <Input
        type="hidden"
        id="answerId"
        name="answerId"
        defaultValue={props.editingAnswer && props.editingAnswer.id}
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
};

export default AnswerAdd;
