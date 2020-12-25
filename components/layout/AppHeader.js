import React from "react";
import classNames from "classnames";
import { NavbarBrand, Navbar, Container, Button } from "reactstrap";

import AppLogo from "../theme/AppLogo";
import LoginButton from "../app/LoginButton";
import LogoutButton from "../app/LogoutButton";
import ProfileOptions from "../app/ProfileOptions";

const AppHeader = (props) => (
  <Navbar dark expand="xs" className="absolute-top w-100 py-2">
    <Container>
      <NavbarBrand className="font-weight-bold" href="/">
        <AppLogo />
        Prac Test
      </NavbarBrand>
      {!props.user && <LoginButton />}
      {props.user && (
        <ProfileOptions/>
      )}
    </Container>
  </Navbar>
);

export default AppHeader;
