import React, { Component, Fragment } from 'react';
import SideNav from '../SideNav';
import CustomNavbar from '../CustomNavbar';
import DataCareer from './DataCareer';

export class Career extends Component {
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
                <SideNav businessProps={true} myPropsToggle={ this.state.myToggle } />
                <CustomNavbar myPropsToggle={ (value) => this.handleToggle(value) } show={ this.state.myToggle } />
                <DataCareer myPropsToggle={ this.state.myToggle } />
            </Fragment>
        )
    }
}

export default Career
