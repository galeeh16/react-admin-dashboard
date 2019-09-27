import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCol } from 'mdbreact';
import TablePromotion from './TablePromotion';


export class DataPromotion extends Component {
    render() {
        return (
            <div className={this.props.myPropsToggle ? "main-sidebar-inactive" : "main"}>
                <MDBCol style={{padding: '0'}}>
                    <MDBCard style={{ minHeight: 'calc(100vh - 90px)' }}>
                        <MDBCardBody>
                            <TablePromotion myPropsToggle={this.props.myPropsToggle}/>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </div>
        )
    }
}

export default DataPromotion
