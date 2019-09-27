import React, { Component, Fragment } from 'react'
import SideNav from '../SideNav'
import CustomNavbar from '../CustomNavbar'
import AddCareerCategoryForm from './AddCareerCategoryForm'

export class AddCareerCategory extends Component {

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
                <CustomNavbar myPropsToggle={(event) => this.handleToggle(event)} show={this.state.myPropsToggle} />
                <AddCareerCategoryForm myPropsToggle={this.state.myPropsToggle} />
            </Fragment>
        )
    }
}

export default AddCareerCategory
