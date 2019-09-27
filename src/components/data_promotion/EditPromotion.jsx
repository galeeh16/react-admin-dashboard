import React, { Component, Fragment } from 'react'
import SideNav from '../SideNav'
import CustomNavbar from '../CustomNavbar'
import EditPromotionForm from './EditPromotionForm'

export class EditPromotion extends Component {
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
                <EditPromotionForm myPropsToggle={this.state.myPropsToggle} id={this.props.match.params.id} />
            </Fragment>
        )
    }
}

export default EditPromotion
