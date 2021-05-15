import React, { useState } from "react";
import { faPen, faPlus, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
import AddEditStudent from "./AddEditStudent";

const Students = (props) => {
  const [modal, setModal] = useState(false);
  const studentData = props.studentProfiles.map((student) => {
    return (
      <>
        <Button
          color="primary"
          size="lg"
          className="mr-1"
          key={student.id}
          onClick={() => props.studentSelected(student.id)}
        >
          <FontAwesomeIcon icon={faUser} />
          <> </>
          {student.firstName}
        </Button>
        <Button
          color="secondary"
          className="mr-1 mb-1"
          onClick={() => handleStudentEdit(student.id)}
        >
          <FontAwesomeIcon icon={faPen} />
        </Button>
      </>
    );
  });

  const handleStudentEdit = (studentId) => {
    alert(`Editing student ${studentId}`);
  };

  const toggle = () => {
    setModal(!modal);
  };

  return (
    <>
      {studentData}
      <br />
      <br />

      <Button color="success" className="mr-1" onClick={toggle}>
        <FontAwesomeIcon icon={faPlus} /> Add
      </Button>
      <Modal isOpen={modal} toggle={toggle} className="primary">
        <ModalHeader toggle={toggle}>New Child Profile</ModalHeader>
        <ModalBody>
          <AddEditStudent
            isOpen={modal}
            closeModal={toggle}
            parentUserId={props.parentUserId}
          />
        </ModalBody>
      </Modal>
    </>
  );
};

export default Students;
