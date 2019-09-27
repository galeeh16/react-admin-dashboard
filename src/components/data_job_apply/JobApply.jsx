import React, { Component, Fragment } from 'react';
import CustomNavbar from '../CustomNavbar';
import SideNav from '../SideNav';
import DataJobApply from './DataJobApply';

export class JobApply extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myToggle: props.location.state !== undefined ? this.props.location.state.myPropsToggle : false
        }
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
                <DataJobApply myPropsToggle={ this.state.myToggle } />
            </Fragment>
        )
    }
}

export default JobApply
