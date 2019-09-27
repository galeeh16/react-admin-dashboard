import React, { Component, Fragment } from 'react'
import SideNav from '../SideNav'
import CustomNavbar from '../CustomNavbar'
import AddUserForm from './AddUserForm'

export class AddUser extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myPropsToggle: props.location.state.myPropsToggle
        }
    }

    handleToggle = (params) => {
        // console.log(params)
        this.setState({
            myPropsToggle: params
        })
    }

    render() {
        console.log(this.state.myPropsToggle)
        return (
            <Fragment>
                <SideNav myPropsToggle={this.state.myPropsToggle}/>
                <CustomNavbar myPropsToggle={ (value) => this.handleToggle(value) } show={this.props.location.state.myPropsToggle} />
                <AddUserForm myPropsToggle={this.state.myPropsToggle}/>
            </Fragment>
        )
    }
}

export default AddUser
