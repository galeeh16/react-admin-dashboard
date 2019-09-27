import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCol } from 'mdbreact';
import TableJobApply from './TableJobApply';


export class DataJobApply extends Component {
    render() {
        return (
            <div className={this.props.myPropsToggle ? "main-sidebar-inactive" : "main"}>
                <MDBCol style={{ padding: '0'}}>
                    <MDBCard style={{width: '100%'}}>
                        <MDBCardBody style={{ minHeight: 'calc(100vh - 95px)'}}>
                            <TableJobApply myPropsToggle={this.props.myPropsToggle} />
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </div>
        )
    }
}

export default DataJobApply
