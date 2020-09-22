import React from "react";
import { Button } from "reactstrap";

const LoginButton = () => {
  return (    
      <Button
        color="success"
        target="_blank"
        rel="noreferrer noopener"
        className="my-2 ml-2 btn-pill"        
      >
        Login
      </Button>    
  );
};

export default LoginButton;
