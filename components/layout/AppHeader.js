import React from "react";
import { NavbarBrand, Navbar, Container, Button } from "reactstrap";

import AppLogo from "../theme/AppLogo";
import LoginButton from "../app/LoginButton";
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
        <ProfileOptions user={props.user}/>
      )}
    </Container>
  </Navbar>
);

export default AppHeader;
