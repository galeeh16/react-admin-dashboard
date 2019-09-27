import React, { Component, Fragment } from 'react';
import CustomNavbar from '../CustomNavbar';
import SideNav from '../SideNav';
import DataCareerCategory from './DataCareerCategory';
// import Footer from '../Footer';

export class CareerCategory extends Component {
    constructor(props) {
        super(props)
        this.state = {
            myToggle: props.location.state !== undefined ? props.location.state.myPropsToggle : false
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
                <DataCareerCategory myPropsToggle={ this.state.myToggle } />
                {/* <Footer /> */}
            </Fragment>
        )
    }
}

export default CareerCategory
