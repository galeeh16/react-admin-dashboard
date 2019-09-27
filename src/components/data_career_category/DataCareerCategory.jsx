import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCol } from 'mdbreact';
import TableCareerCategory from './TableCareerCategory';


export class DataCareerCategory extends Component {
    render() {
        return (
            <div className={this.props.myPropsToggle ? "main-sidebar-inactive" : "main"}>
                <MDBCol style={{padding: '0'}}>
                    <MDBCard style={{width: '100%'}}>
                        <MDBCardBody>
                            <TableCareerCategory myPropsToggle={this.props.myPropsToggle} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </div>
        )
    }
}

export default DataCareerCategory
