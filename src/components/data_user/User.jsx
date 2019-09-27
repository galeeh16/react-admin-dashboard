import React, { Component, Fragment } from 'react';
import SideNav from '../SideNav';
import CustomNavbar from '../CustomNavbar';
import DataUser from './DataUser';

export class User extends Component {
    state = {
        myToggle: false
    }

    handleToggle = (params) => {
        this.setState({
          myToggle: params
        })
    }

    render() {
        return (
            <Fragment>
                <SideNav myPropsToggle={ this.state.myToggle } />
                <CustomNavbar myPropsToggle={ (value) => this.handleToggle(value) } show={ this.state.myToggle } />
                <DataUser myPropsToggle={ this.state.myToggle } />
            </Fragment>
        )
    }
}

export default User
