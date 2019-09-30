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
      isOpen: props.mobile !== undefined ? props.mobile : false,
      toggle: props.show
    };
  }

  handlePropsToggleSidebar = (val) => {
    this.props.myPropsToggle(val)
  }

  hiddenSidebar =() => {
    this.setState({
      ...this.state,
      toggle: !this.state.toggle
    }, () => {
      this.handlePropsToggleSidebar(this.state.toggle)
    })
  }

  toggleSidebar = () => {
    console.log('clicked toggle sidebar')
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
    window.location.href = "http://103.14.21.56:49000/";
  }

  render() {
    if (!CekLogin()) {
      return (<Redirect to="/" />)
    }

    return (
      <MDBNavbar color="primary-color" dark expand="md" style={this.state.toggle ? { marginLeft: '0', position: 'relative'} : { marginLeft: '270px', position: 'relative'}}>
        <MDBNavbarBrand>
          <i className="navbar-toggler-icon waves-effect waves-light" onClick={this.toggleSidebar} style={{ cursor: 'pointer' }}></i>
        </MDBNavbarBrand>
        <span className={this.state.toggle ? "mobile-burger-hidden": "mobile-burger-show"} onClick={this.hiddenSidebar} style={{zIndex: '9999', position: 'fixed'}}>
          <i className="fa">&#x2715;</i>
        </span>
        <MDBNavbarToggler onClick={this.toggleSidebar} />
        <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav right>
            <MDBNavItem style={{marginRight: '1em'}}>
              <MDBDropdown>
                {/* <CekLogin isLogin={this.state.isLogin} /> */}
                <MDBDropdownToggle nav caret>
                  <MDBIcon icon="user" /> Administrator 
                </MDBDropdownToggle>
                <MDBDropdownMenu className="dropdown-default">
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
