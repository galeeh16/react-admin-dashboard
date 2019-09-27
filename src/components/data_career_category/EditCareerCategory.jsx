import React, { Component, Fragment } from 'react';
import SideNav from '../SideNav';
import CustomNavbar from '../CustomNavbar';
import EditCareerCategoryForm from './EditCareerCategoryForm';

export class EditCareerCategory extends Component {

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
                <EditCareerCategoryForm myPropsToggle={this.state.myPropsToggle} id={this.props.match.params.id} />
            </Fragment>
        )
    }
}

export default EditCareerCategory
