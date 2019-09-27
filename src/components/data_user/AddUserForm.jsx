import React, { Component } from 'react'
import {Redirect} from 'react-router-dom'
import { MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn } from 'mdbreact'
import axios from 'axios'
import Spinner from '../Spinner'

export class AddUserForm extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: '',
            confirm_password: '',
            email: '',
            telp: '',
            loading: false,
            errors: [],
            redirect: false,
        }
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value });
    }

    submitHandler = async (e) => {
        e.preventDefault()
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        await this.setState({loading: true}, () => {
            axios({
                method: 'POST',
                url: 'https://103.14.21.56:7443/api/v1/users/user/', 
                httpsAgent: agent,
                data: {
                    username: this.state.username,
                    password: this.state.password,
                    confirm_password: this.state.confirm_password,
                    email: this.state.email,
                    telp: this.state.telp,
                }
            })
            .then(response => {
                this.setState({redirect: true, loading: false});
            })
            .catch(error => {
                // console.log(error.response)
                this.setState({errors: error.response.data, loading: false})
            });
        })
    }

    render() {
        if (this.state.redirect === true) {
            return(<Redirect to="/home" />)
        }

        return (
            <div className={this.props.myPropsToggle ? "main-sidebar-inactive" : "main"} style={{ height: 'calc(100vh - 60px)' }}>
                <MDBCol style={{ padding: '0', height: '100%' }} >
                    <MDBCard style={{ width: '100%', height: '100%' }}>
                        <MDBCardBody>
                            <MDBCardTitle className="teal-text">Add User</MDBCardTitle>
                            <form method="POST" action="" onSubmit={this.submitHandler}>
                                <MDBInput label="Username" size="md" value={this.state.username} onChange={this.changeHandler} name="username" autoComplete="off" className={this.state.errors.username ? 'is-invalid' : ''}>
                                    <span className="error-username error-message">{ this.state.errors.username ? this.state.errors.username[0] : '' }</span>
                                </MDBInput>
                                <MDBInput type="password" label="Password" size="md" value={this.state.password} onChange={this.changeHandler} name="password" autoComplete="off" className={this.state.errors.password ? 'is-invalid' : ''}>
                                    <span className="error-password error-message">{ this.state.errors.password ? this.state.errors.password[0] : '' }</span>
                                </MDBInput>
                                <MDBInput type="password" label="Confirm Password" size="md" value={this.state.confirm_password} onChange={this.changeHandler} name="confirm_password" autoComplete="off"  className={this.state.errors.confirm_password ? 'is-invalid' : ''}>
                                    <span className="error-confirm_password error-message">{ this.state.errors.confirm_password ? this.state.errors.confirm_password[0] : '' }</span>
                                </MDBInput>
                                <MDBInput label="Email" size="md" value={this.state.email} onChange={this.changeHandler} name="email" autoComplete="off" className={this.state.errors.email ? 'is-invalid' : ''}>
                                    <span className="error-email error-message">{ this.state.errors.email ? this.state.errors.email[0] : '' }</span>
                                </MDBInput>
                                <MDBInput label="Telp" size="md" value={this.state.telp} onChange={this.changeHandler} name="telp" autoComplete="off" className={this.state.errors.telp ? 'is-invalid' : ''}>
                                    <span className="error-telp error-message">{ this.state.errors.telp ? this.state.errors.telp[0] : '' }</span>
                                </MDBInput>
                                {this.state.loading === true? <MDBBtn type="button" color="purple" style={{padding: '0.4rem 2.12rem' }}><Spinner /></MDBBtn> : <MDBBtn type="submit" className="btn" color="secondary">Submit</MDBBtn>}
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </div>
        )
    }
}

export default AddUserForm
