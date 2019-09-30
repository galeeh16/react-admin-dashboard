import React, { Component } from "react";
import { MDBInput, MDBContainer, MDBRow, MDBCol, MDBBtn, MDBCard, MDBCardBody, MDBAlert, MDBIcon } from "mdbreact";
import {Redirect} from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
// import AlertCustom from './alert/AlertCustom';


class Login extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            loading: false,
            redirect: false,
            fail: false,
            notAdmin: false,
            notLogin: props.location.state !== undefined ? true : false
        }
    }

    submitHandler = async (event) => {
        event.preventDefault();

        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        this.setState({loading: true}, () => {
            axios.post('https://103.14.21.56:7443/api/v1/token/', {
                username: this.state.username,
                password: this.state.password,
                httpAgent: agent,
            })
            .then(res => {
                console.log(res.data);
                if (res.status === 200) {
                    if (res.data.is_superuser === true) {
                        localStorage.setItem('token', res.data.access);
                        localStorage.setItem('username', res.data.username);
                        this.setState({loading: false, redirect: true});
                    } else {
                        this.setState({fail: true, redirect: false, loading: false});
                    }
                }
            })
            .catch(error => {
                this.setState({
                    loading: false, 
                    fail: true
                })
            });
        })
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    };

    render() {

        if(this.state.redirect) {
            return(<Redirect to="/home" />);
        }

        return (
            <MDBContainer className="pb-4">
                {/* <AlertCustom show={true} text="Sucecss updated data" /> */}
                <MDBRow className="mb-4" center>
                    <MDBCol md="6" sm="12" className="mb-4 md-offset-3">
                        <MDBCard style={{marginTop: '100px'}}>
                            <MDBCardBody>
                                <center>
                                    <img src="https://img.icons8.com/color/96/000000/lock.png" alt="" />
                                    <h2><b>LOGIN</b></h2>
                                    <div className="err-login"></div>
                                    { this.state.notLogin === true ? <div className="alert alert-info" role="alert">
                                        You're session has expired, please login again.
                                        </div> : '' }
                                    { this.state.fail === true ? <MDBAlert color="danger" >
                                        <MDBIcon icon="exclamation-triangle" /> Inccorect username or password given!
                                        </MDBAlert> : ''}
                                </center>
                                <form method="POST" className="needs-validation" onSubmit={this.submitHandler} noValidate>
                                    <MDBInput
                                        name="username"
                                        type="text"
                                        autoComplete="off"
                                        id="materialFormRegisterNameEx"
                                        value={this.state.username}
                                        onChange={this.changeHandler}
                                        label="Username"
                                        icon="user"
                                        required
                                    >
                                        <span className="help-block text-danger"> {this.state.invalidUsername}</span>
                                    </MDBInput>

                                    <div className="valid-feedback"></div>
                                    <MDBInput
                                        type="password"
                                        name="password"
                                        label="Password"
                                        id="materialFormRegisterPasswordEx4"
                                        value={this.state.password}
                                        onChange={this.changeHandler}
                                        icon="lock"
                                        autoComplete="off"
                                        required
                                    />
                                    {this.state.loading === true ? <div style={{textAlign: 'center'}}><Spinner /></div> : <MDBBtn className="btn btn-dark btn-block" type="submit">Login</MDBBtn>}
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        );
    }
}

export default Login;