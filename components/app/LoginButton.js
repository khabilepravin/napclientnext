import React from "react";
import { Button } from "reactstrap";
import { useRouter } from "next/router";

const LoginButton = (props) => {
  const router = useRouter();
  const handleLoginClick = () => {
    router.push("/api/login");
  };

  return (
    <Button
      color="success"
      target="_blank"
      rel="noreferrer noopener"
      className="my-2 ml-2 btn-pill"
      onClick={handleLoginClick}
    >
      Login
    </Button>
  );
};

export default LoginButton;
