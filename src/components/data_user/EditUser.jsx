import React, { Component, Fragment } from 'react';
import SideNav from '../SideNav';
import CustomNavbar from '../CustomNavbar';
import EditUserForm from './EditUserForm';

export class EditUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myPropsToggle: props.location.state.myPropsToggle
        }
    }

    handleToggle = (params) => {
        this.setState({
            myPropsToggle: params
        })
    }

    render() {
        return (
            <Fragment>
                <SideNav myPropsToggle={this.state.myPropsToggle} />
                <CustomNavbar myPropsToggle={ (value) => this.handleToggle(value) } show={this.state.myPropsToggle} />
                <EditUserForm myPropsToggle={this.state.myPropsToggle} id={this.props.match.params.id}/>
            </Fragment>
        )
    }
}

export default EditUser
