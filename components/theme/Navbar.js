import React from "react";
//import { connect } from "react-redux";
//import { toggleSidebar } from "../../redux/actions/sidebarActions";
import classNames from "classnames";
import AppLogo from "../theme/AppLogo";
import Link from "next/link";

import {
  Row,
  Col,
  Collapse,
  Navbar,
  Nav,
  NavbarBrand,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  ListGroup,
  ListGroupItem,
  Form,
  Input
} from "reactstrap";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faBellSlash,
  faBuilding,
  faEnvelopeOpen,
  faComments,
  faChartPie,
  faCogs,
  faCog,
  faArrowAltCircleRight,
  faUser
} from "@fortawesome/free-solid-svg-icons";

// import avatar2 from "/avatar-2.jpg";
// import avatar3 from "/avatar-3.jpg";
// import avatar4 from "/avatar-4.jpg";
// import avatar5 from "/avatar-5.jpg";

const notifications = [
  {
    type: "important",
    title: "Update completed",
    description: "Restart server 12 to complete the update.",
    time: "2h ago"
  },
  {
    type: "default",
    title: "Lorem ipsum",
    description: "Aliquam ex eros, imperdiet vulputate hendrerit et.",
    time: "6h ago"
  },
  {
    type: "login",
    title: "Login from 192.186.1.1",
    description: "",
    time: "8h ago"
  },
  {
    type: "request",
    title: "New connection",
    description: "Anna accepted your request.",
    time: "12h ago"
  }
];

const messages = [
  // {
  //   name: "Michelle Bilodeau",
  //   avatar: avatar5,
  //   description: "Nam pretium turpis et arcu. Duis arcu tortor.",
  //   time: "5m ago"
  // },
  // {
  //   name: "Kathie Burton",
  //   avatar: avatar3,
  //   description: "Pellentesque auctor neque nec urna.",
  //   time: "30m ago"
  // },
  // {
  //   name: "Alexander Groves",
  //   avatar: avatar2,
  //   description: "Curabitur ligula sapien euismod vitae.",
  //   time: "2h ago"
  // },
  // {
  //   name: "Daisy Seger",
  //   avatar: avatar4,
  //   description: "Aenean tellus metus, bibendum sed, posuere ac, mattis non.",
  //   time: "5h ago"
  // }
];

const NavbarDropdown = ({
  children,
  count,
  header,
  footer,
  icon,
  active,
  indicator
}) => (
  <UncontrolledDropdown nav inNavbar className="ml-lg-1" active={active}>
    <DropdownToggle nav className="nav-icon dropdown-toggle position-relative">
      <FontAwesomeIcon icon={icon} className="align-middle" />
      {indicator ? <span className="indicator" /> : ""}
    </DropdownToggle>
    <DropdownMenu right className="dropdown-menu-lg py-0">
      <div className="dropdown-menu-header position-relative">
        {count} {header}
      </div>
      <ListGroup>{children}</ListGroup>
      <DropdownItem header className="dropdown-menu-footer">
        <span className="text-muted">{footer}</span>
      </DropdownItem>
    </DropdownMenu>
  </UncontrolledDropdown>
);

const NavbarDropdownItem = ({ icon, title, description, time, spacing }) => (
  <ListGroupItem>
    <Row noGutters className="align-items-center">
      <Col xs={2}>{icon}</Col>
      <Col xs={10} className={spacing ? "pl-2" : null}>
        <div className="text-dark">{title}</div>
        <div className="text-muted small mt-1">{description}</div>
        <div className="text-muted small mt-1">{time}</div>
      </Col>
    </Row>
  </ListGroupItem>
);

const NavbarToggle = (
    <span
      className="sidebar-toggle d-flex mr-2"
      // onClick={() => {
      //   dispatch(toggleSidebar());
      // }}
    >
      <i className="hamburger align-self-center" />
    </span>
  );

const NavbarSearch = () => (
    <Form inline>
      <Input
        type="text"
        placeholder="Search tests..."
        aria-label="Search"
        className="form-control-lite"
      />
    </Form>
  );


const NavbarDropdowns = (
    <Collapse navbar>
      <Nav className="ml-auto" navbar>
        <NavbarDropdown
          header="New Messages"
          footer="Show all messages"
          icon={faEnvelopeOpen}
          count={messages.length}
          active
        >
          {messages.map((item, key) => {
            return (
              <NavbarDropdownItem
                key={key}
                icon={
                  <img
                    className="avatar img-fluid rounded-circle"
                    src={item.avatar}
                    alt={item.name}
                  />
                }
                title={item.name}
                description={item.description}
                time={item.time}
                spacing
              />
            );
          })}
        </NavbarDropdown>

        <NavbarDropdown
          header="New Notifications"
          footer="Show all notifications"
          icon={faBell}
          count={notifications.length}
          indicator
        >
          {notifications.map((item, key) => {
            let icon = (
              <FontAwesomeIcon icon={faEnvelopeOpen} className="text-warning" />
            );

            if (item.type === "important") {
              icon = <FontAwesomeIcon icon={faBell} className="text-danger" />;
            }

            if (item.type === "login") {
              icon = (
                <FontAwesomeIcon icon={faBuilding} className="text-primary" />
              );
            }

            if (item.type === "request") {
              icon = (
                <FontAwesomeIcon icon={faBellSlash} className="text-success" />
              );
            }

            return (
              <NavbarDropdownItem
                key={key}
                icon={icon}
                title={item.title}
                description={item.description}
                time={item.time}
              />
            );
          })}
        </NavbarDropdown>

        <UncontrolledDropdown nav inNavbar className="ml-lg-1">
          <DropdownToggle nav caret>
            <FontAwesomeIcon icon={faCog} className="align-middle" />
          </DropdownToggle>
          <DropdownMenu right>
            <DropdownItem>
              <FontAwesomeIcon
                icon={faUser}
                fixedWidth
                className="mr-2 align-middle"
              />
              View Profile
            </DropdownItem>
            <DropdownItem>
              <FontAwesomeIcon
                icon={faComments}
                fixedWidth
                className="mr-2 align-middle"
              />
              Contacts
            </DropdownItem>
            <DropdownItem>
              <FontAwesomeIcon
                icon={faChartPie}
                fixedWidth
                className="mr-2 align-middle"
              />
              Analytics
            </DropdownItem>
            <DropdownItem>
              <FontAwesomeIcon
                icon={faCogs}
                fixedWidth
                className="mr-2 align-middle"
              />
              Settings
            </DropdownItem>
            <DropdownItem divider />
            <DropdownItem>
              <FontAwesomeIcon
                icon={faArrowAltCircleRight}
                fixedWidth
                className="mr-2 align-middle"
              />
              Sign out
            </DropdownItem>
          </DropdownMenu>
        </UncontrolledDropdown>
      </Nav>
    </Collapse>
  );

const NavbarComponent = () => {
  return (
    <Navbar dark expand="xs" className="absolute-top w-100 py-2">      
        <React.Fragment>
          
          <NavbarBrand className="font-weight-bold">
            <AppLogo/><Link href="/"><a className="font-weight-bold navbar-brand">Prac Test</a></Link>
          </NavbarBrand>   
          
          {/* <NavbarSearch /> */}
        </React.Fragment>
      
    </Navbar>
  );
};

export default NavbarComponent;
