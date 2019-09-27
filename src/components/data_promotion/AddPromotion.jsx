import React, { Component, Fragment } from 'react'
import SideNav from '../SideNav'
import CustomNavbar from '../CustomNavbar'
import AddPromotionForm from './AddPromotionForm'

export class AddPromotion extends Component {
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
                <SideNav myPropsToggle={this.state.myPropsToggle} />
                <CustomNavbar myPropsToggle={ (value) => this.handleToggle(value) } show={this.state.myPropsToggle} />
                <AddPromotionForm myPropsToggle={this.state.myPropsToggle} />
            </Fragment>
        )
    }
}

export default AddPromotion
