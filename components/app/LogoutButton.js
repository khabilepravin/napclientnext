import React from "react";
import { Button } from "reactstrap";

const LogoutButton = () => {  
  return (
      <Button
        color="warning"
        target="_blank"
        rel="noreferrer noopener"
        className="my-2 ml-2 btn-pill">
        Log Out
      </Button>    
  );
};

export default LogoutButton;
