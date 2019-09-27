import React, { Component, Fragment } from 'react'
import SideNav from '../SideNav'
import CustomNavbar from '../CustomNavbar'
import AddJobVacancyForm from './AddJobVacancyForm'

export class AddJobVacancy extends Component {

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
                <CustomNavbar myPropsToggle={(event) => this.handleToggle(event)} show={this.state.myPropsToggle} />
                <AddJobVacancyForm myPropsToggle={this.state.myPropsToggle} />
            </Fragment>
        )
    }
}

export default AddJobVacancy
