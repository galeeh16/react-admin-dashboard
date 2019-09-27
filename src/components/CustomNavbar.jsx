import React, { Component } from "react";
import { Redirect } from 'react-router-dom';
import {
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarNav,
  MDBNavItem,
  // MDBNavLink,
  MDBNavbarToggler,
  MDBCollapse,
  MDBDropdown,  
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBDropdownToggle,
  MDBIcon,
} from "mdbreact";
import "./CustomNavbar.css";
import { CekLogin } from "../services/CekLogin.js";

class CustomNavbar extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isOpen: false,
      toggle: props.show
    };
  }

  handlePropsToggleSidebar = (val) => {
    this.props.myPropsToggle(val)
  }

  toggleSidebar = () => {
    this.setState({
      toggle: !this.state.toggle
    }, () => {
      this.handlePropsToggleSidebar(this.state.toggle)
    })
  }

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  };

  logout = () => {
    localStorage.clear();
    // return <CekLogin />
    window.location.href = "http://localhost:3000";
  }

  render() {
    if (!CekLogin()) {
      return (<Redirect to="/" />)
    }

    return (
      <MDBNavbar color="primary-color" dark expand="md" style={this.state.toggle ? { marginLeft: '0', position: 'relative', zIndex: '9' } : { marginLeft: '270px', position: 'relative', zIndex: '9' }}>
        <MDBNavbarBrand>
          <i className="navbar-toggler-icon waves-effect waves-light" onClick={this.toggleSidebar} style={{ cursor: 'pointer' }}></i>
        </MDBNavbarBrand>
        <MDBNavbarToggler onClick={this.toggleCollapse} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem style={{marginRight: '1em'}}>
              <MDBDropdown>
                {/* <CekLogin isLogin={this.state.isLogin} /> */}
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" /> Administrator 
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
                  {/* <MDBDropdownItem href="#!">
                    <MDBIcon icon="user" /> Profile
                  </MDBDropdownItem>
                  <MDBDropdownItem href="#!">
                    <MDBIcon icon="cog" /> Settings
                  </MDBDropdownItem> */}
                  <MDBDropdownItem href="!#" onClick={this.logout}>
                    <MDBIcon icon="sign-out-alt" /> Logout
                  </MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavItem>
          </MDBNavbarNav>
        </MDBCollapse>
      </MDBNavbar>
    );
  }
}

export default CustomNavbar;
