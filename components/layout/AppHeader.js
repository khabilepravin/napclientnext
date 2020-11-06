import React from "react";
import classNames from "classnames";
import { NavbarBrand, Navbar, Container,  } from "reactstrap";
import AppLogo from "../theme/AppLogo";
import LoginButton from "../app/LoginButton";
import LogoutButton from "../app/LogoutButton";

const AppHeader = (props) => (
    <Navbar dark expand="xs" className="absolute-top w-100 py-2">
      <Container>
        <NavbarBrand className="font-weight-bold" href="/">
        <AppLogo/>Prac Test
        </NavbarBrand>   
        <LoginButton loggedInUser={props.user}/>
        <LogoutButton loggedInUser={props.user}/>
      </Container>  
    </Navbar>
  );
  
  export default AppHeader;