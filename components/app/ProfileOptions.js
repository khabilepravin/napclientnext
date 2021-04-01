import React from "react";
import {
  Button,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  Nav,
  NavbarBrand
} from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/router";
import {
  faBell,
  faBellSlash,
  faBuilding,
  faEnvelopeOpen,
  faComments,
  faChartPie,
  faCogs,
  faCog,
  faCaretDown,
  faArrowAltCircleRight,
  faUser,
} from "@fortawesome/free-solid-svg-icons";


const ProfileOptions = (props) => {
  const router = useRouter();
  const handleLogoutClick = () => {
    router.push("/api/logout");
  };

  return (
    <Nav className="ml-auto">
      <UncontrolledDropdown inNavbar className="ml-lg-1">
        <DropdownToggle nav>
          <span className="text-white">{props.user.name} </span>
          <FontAwesomeIcon
            icon={faCaretDown}
            className="align-middle font-weight-bold text-white"
          />
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
            Dashboard
          </DropdownItem>
          <DropdownItem divider />
          <DropdownItem onClick={handleLogoutClick}>
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
  );
};

export default ProfileOptions;
