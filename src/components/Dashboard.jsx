import React, { Component } from 'react';
import { MDBCard, MDBCardBody, MDBCol } from 'mdbreact';
import TableUser from './data_user/TableUser';
import ModalUser from './data_user/ModalUser';

export class Dashboard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        }
    }

    toggle = () => {
        this.setState({
          modal: !this.state.modal
        });
    }

    render() {
        return (
            <div className={this.props.myPropsToggle ? "main-sidebar-inactive" : "main"}>
                <MDBCol style={{padding: '0'}}>
                    <MDBCard style={{width: '100%'}}>
                        <MDBCardBody style={{ minHeight: 'calc(100vh - 90px)' }}>
                            <TableUser myPropsToggle={this.props.myPropsToggle}/>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
                <ModalUser isOpen={this.toggle.bind(this)}/>
            </div>
        )
    }
}

export default Dashboard
