import React, { Fragment } from "react";
import {
  MDBDropdownToggle,
  MDBIcon,
  MDBBtn,
  MDBNavLink,
  MDBNavItem,
  //   MDBDropdown,
  MDBDropdownItem,
  MDBDropdownMenu
} from "mdbreact";

const isLogin = false;
const CekLogin = ({ isLogin }) => {
  // const CekLogin = () => {
  if (isLogin) {
    return (
      <Fragment>
        <MDBDropdownToggle nav caret>
          <MDBIcon icon="user" /> Galih Anggoro Jati
        </MDBDropdownToggle>
        <MDBDropdownMenu className="dropdown-default">
          <MDBDropdownItem href="#!">
            <MDBIcon icon="user" /> Profile
          </MDBDropdownItem>
          <MDBDropdownItem href="#!">
            <MDBIcon icon="cog" /> Settings
          </MDBDropdownItem>
          <MDBDropdownItem href="#!">
            <MDBIcon icon="sign-out-alt" /> Logout
          </MDBDropdownItem>
        </MDBDropdownMenu>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        <MDBNavItem>
          <MDBNavLink to="/login" right="true">
            {/* <MDBBtn
              color="#f57f17 yellow darken-4 text-white"
              className="btn-sm"
            > */}
            <MDBIcon icon="sign-in-alt" /> LOGIN
            {/* </MDBBtn> */}
          </MDBNavLink>
        </MDBNavItem>
      </Fragment>
    );
  }
};

export default CekLogin;
