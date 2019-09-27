import React, { Component, Fragment } from "react";
// import { Link } from "react-router-dom";
// import { MDBContainer, MDBRow, MDBJumbotron } from "mdbreact";
import CustomNavbar from './CustomNavbar';
import SideNav from './SideNav';
import Dashboard from './Dashboard';
// import Footer from './Footer';

class Home extends Component {
  state = {
    myToggle: false
  }

  handleToggle = (params) => {
    this.setState({
      myToggle: params
    })
  }

  // componentDidMount(){
  //   document.title = "Admin Trisakti | User Management"
  // }

  render() {
    return (
      <Fragment>
        <SideNav myPropsToggle={ this.state.myToggle } />
        <CustomNavbar myPropsToggle={ (value) => this.handleToggle(value) } show={this.state.myToggle} />
        <Dashboard myPropsToggle={ this.state.myToggle } />
      </Fragment>
    );
  }
}

export default Home;
