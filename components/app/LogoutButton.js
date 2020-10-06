import React from "react";
import { Button } from "reactstrap";
import Link from "next/link";

const LogoutButton = () => {  
  return (
      // <Button
      //   color="warning"
      //   target="_blank"
      //   rel="noreferrer noopener"
      //   className="my-2 ml-2 btn-pill">
      //   Log Out
      // </Button>    
      <Link href="/api/logout">
        <a >Logout</a>
      </Link>
  );
};

export default LogoutButton;
