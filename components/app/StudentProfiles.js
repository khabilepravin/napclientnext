import React from "react";

import {
  Button
} from "reactstrap";

const StudentProfiles = (props) => {
  let students = props.studentProfiles.map((student) => {
    return <Button>{student.firstName}</Button>
  });

  return students;
}

export default StudentProfiles;