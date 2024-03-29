import React from "react";
import { Button } from "reactstrap";
import { useRouter } from "next/router";

const LogoutButton = (props) => {
  const router = useRouter();
  const handleLogoutClick = () => {
    router.push("/api/logout");
  };

  return (
    <Button
      color="warning"
      target="_blank"
      rel="noreferrer noopener"
      className="my-2 ml-2 btn-pill"
      onClick={handleLogoutClick}
    >
      Log Out
    </Button>
  );
};

export default LogoutButton;
