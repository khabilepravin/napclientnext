import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { ADD_STUDENT, UPDATE_STUDENT } from "../../lib/apiproxy/mutations";
import { useMutation } from "@apollo/react-hooks";

import {  
  Form,
  FormGroup,
  Input,
  Label,
  Button,
} from "reactstrap";

import {
  faSave,
  faCross,
  faWindowClose,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";

const schema = Yup.object().shape({
  firstName: Yup.string().required("Name is required"),
});

const AddEditStudent = React.memo((props) => {
  const [studentId] = useState(
    props.editedStudent ? props.editedStudent.id : null
  );  
  const[userName,setUserName] = useState();
  const router = useRouter();

  const [addStudent] = useMutation(ADD_STUDENT, {
    onCompleted() {
      reset();    
    },
  });

  const [updateStudent] = useMutation(UPDATE_STUDENT, {
    onCompleted() {
      reset();
    },
  });

  const handleFirstNameChange = (e) => {
    setUserName(e.target.value);
  };

  const { register, handleSubmit, reset, errors } = useForm({
    validationSchema: schema,
  });
  const onSubmit = (data) => {
    if (props.editedStudent) {
      updateStudent({ variables: { user: data } });
    } else {
      addStudent({ variables: { user: data } });
    }
  };


  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Label>Student/Child First Name</Label>
        <Input
          type="text"
          name="firstName"
          placeholder="Student/Child First Name"
          innerRef={register}
          defaultValue={props.editedStudent && props.editedStudent.firstName}
          onChange={handleFirstNameChange}
        />
        {errors.firstName && <p className="text-danger">{errors.firstName.message}</p>}
      </FormGroup>
      <Input
          type="hidden"
          name="parentUserId"
          innerRef={register}
          value={props.parentUserId}/>
      <Input
          type="hidden"
          name="userName"
          innerRef={register}
          value={userName}/>
      <Button type="submit" color="primary" className="mr-1 mb-1">
        <FontAwesomeIcon icon={faSave} /> Save
      </Button>
      <Button
        type="button"
        color="warning"
        className="mr-1 mb-1"
        onClick={() => router.push("/content")}
      >
        <FontAwesomeIcon icon={faWindowClose} /> Cancel
      </Button>
    </Form>
  );
});

export default AddEditStudent;
