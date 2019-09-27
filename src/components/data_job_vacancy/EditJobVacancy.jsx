import React, { Component, Fragment } from 'react'
import SideNav from '../SideNav'
import CustomNavbar from '../CustomNavbar'
import EditJobVacancyForm from './EditJobVacancyForm'

export class EditJobApply extends Component {
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
                <SideNav businessProps={true} myPropsToggle={this.state.myPropsToggle} />
                <CustomNavbar myPropsToggle={ (value) => this.handleToggle(value) } show={this.state.myPropsToggle} />
                <EditJobVacancyForm myPropsToggle={this.state.myPropsToggle} id={this.props.match.params.id} />
            </Fragment>
        )
    }
}

export default EditJobApply
