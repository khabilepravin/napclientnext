import React from "react";
import { Button } from "reactstrap";
import Link from "next/link";

const LoginButton = () => {
  return (    
      // <Button
      //   color="success"
      //   target="_blank"
      //   rel="noreferrer noopener"
      //   className="my-2 ml-2 btn-pill"        
      // >
      //   Login
      // </Button>    
      <Link href="/api/login">
        <a >Login</a>
      </Link>
  );
};

export default LoginButton;
