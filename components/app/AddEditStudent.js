import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as Yup from "yup";
import { ADD_STUDENT, UPDATE_STUDENT } from "../../lib/apiproxy/mutations";
import { useMutation } from "@apollo/react-hooks";

import {
  Form,
  FormGroup,
  Input,  
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
  const [userName, setUserName] = useState();  
  const router = useRouter();

  const [addStudent] = useMutation(ADD_STUDENT, {
    onCompleted() {
      reset();
      props.closeModal();
    },
  });

  const [updateStudent] = useMutation(UPDATE_STUDENT, {
    onCompleted() {
      reset();
      props.closeModal();
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
 
  const handleCancel = () => {
    props.closeModal();
  };

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <FormGroup>
        <Input
          type="text"
          name="firstName"
          placeholder="Student/Child First Name"
          innerRef={register}
          defaultValue={props.editedStudent && props.editedStudent.firstName}
          onChange={handleFirstNameChange}
        />
        {errors.firstName && (
          <p className="text-danger">{errors.firstName.message}</p>
        )}
      </FormGroup>
      <Input
        type="hidden"
        name="parentUserId"
        innerRef={register}
        value={props.parentUserId}
      />
      <Input
        type="hidden"
        name="userName"
        innerRef={register}
        value={userName}
      />
      <Button type="submit" color="primary">
        <FontAwesomeIcon icon={faSave} /> Save
      </Button>{" "}
      <Button color="secondary" onClick={handleCancel}>
        <FontAwesomeIcon icon={faWindowClose} /> Cancel
      </Button>
    </Form>
  );
});

export default AddEditStudent;
