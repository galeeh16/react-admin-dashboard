import React, { Component, Fragment } from 'react'
import SideNav from '../SideNav'
import CustomNavbar from '../CustomNavbar'
import AddJobApplyForm from './AddJobApplyForm'

export class AddJobApply extends Component {
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
        console.log(this.props)
        return (
            <Fragment>
                <SideNav businessProps={true} myPropsToggle={this.state.myPropsToggle} />
                <CustomNavbar myPropsToggle={ (value) => this.handleToggle(value) } show={this.state.myPropsToggle} />
                <AddJobApplyForm myPropsToggle={this.state.myPropsToggle} />
            </Fragment>
        )
    }
}

export default AddJobApply
