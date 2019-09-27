import React, { Component } from 'react';
import { MDBListGroup, MDBListGroupItem, MDBIcon } from 'mdbreact';
import { NavLink } from 'react-router-dom';

class SideNav extends Component {
    state = {
        business: this.props.businessProps
    }

    businessManagement = () => {
        this.setState({ business: !this.state.business });
    }
    
    render() {
        return (
            <div className={this.props.myPropsToggle ? "sidebar-fixed-inactive" : "sidebar-fixed"}>
                <a href="#!" className="logo-wrapper waves-effect">
                    <h2>TRISAKTI DASHBOARD</h2>
                </a>
                <div className="scrollable">
                <MDBListGroup className="list-group-flush">
                    <NavLink to="/home" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="user" className="mr-4"/> User Management
                        </MDBListGroupItem>
                    </NavLink>  
                    <NavLink to="/promotion" activeClassName="activeClass">
                        <MDBListGroupItem>
                            <MDBIcon icon="ticket-alt" className="" style={{ marginRight: '20px' }}/>
                            Promo Management
                        </MDBListGroupItem>
                    </NavLink>
                    {/* <NavL activeClassName="activeClass"> */}
                        <MDBListGroupItem onClick={this.businessManagement.bind(this)} style={{cursor: 'pointer'}}>
                            <MDBIcon icon="business-time" className="mr-3"/>
                            Business Management
                            <MDBIcon icon="chevron-right" style={this.state.business === true ? {float: 'right', fontSize: '12px', marginTop: '8px', transition: '0.3s', transform: 'rotate(90deg)'} : {float: 'right', fontSize: '12px', marginTop: '8px', transition: '0.3s',}} />
                        </MDBListGroupItem>
                    {/* </NavL> */}
                    {/* DROPDOWN */}
                    <MDBListGroup className="list-group-flush" style={this.state.business === true ? {display: '', transition: '0.3s'} : {display: 'none', transition: '0.3s'} }>
                    {/* <MDBListGroup className="list-group-flush"> */}
                        <NavLink to="/business/career-category" activeClassName="activeClass" style={{borderTop: '1px solid #eee'}}>
                            <MDBListGroupItem>
                                <MDBIcon style={{marginLeft: '35px'}} icon="business-time" className="mr-2"/> Career Category
                            </MDBListGroupItem>
                        </NavLink> 
                        <NavLink to="/business/job-vacancy" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon style={{marginLeft: '35px'}} icon="business-time" className="mr-2"/> Job Vacancy
                            </MDBListGroupItem>
                        </NavLink>
                        <NavLink to="/business/job-apply" activeClassName="activeClass">
                            <MDBListGroupItem>
                                <MDBIcon style={{marginLeft: '35px'}} icon="business-time" className="mr-2"/> Job Apply
                            </MDBListGroupItem>
                        </NavLink>
                    </MDBListGroup>
                    {/* END DROPDOWN */}
                </MDBListGroup>
                </div>
            </div>
        );
    }
}

export default SideNav;