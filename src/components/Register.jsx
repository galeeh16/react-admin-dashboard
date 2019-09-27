import React, { Component } from 'react'
import { MDBBtn, MDBContainer, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBInput } from "mdbreact"
import axios from 'axios'

export class Register extends Component {
    constructor(props) {
        super(props)

        this.state = {
            username: "",
            password: "",
        }
    }

    changeHandler = event => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };

    handleSubmit = e => {
        e.preventDefault();
        
        axios.post("http://127.0.0.1:8000/api/v1/users/", this.state)
            .then(response => {
                document.getElementsByClassName('form-control').classList.remove("is-invalid")
                return console.log(response)
                
            })
            .catch(error => {
                if(error) {
                    if( Array.isArray(error.response.data.username) ) {
                        document.getElementById("username").classList.add("is-invalid")
                        document.getElementById("invalid-feedback-username").innerHTML = error.response.data.username[0]
                    } else {
                        document.getElementById("username").classList.remove("is-invalid")
                        document.getElementById("invalid-feedback-username").innerHTML = ""
                    }

                    if(Array.isArray(error.response.data.password)) {
                        document.getElementById("password").classList.add("is-invalid")
                        document.getElementById("invalid-feedback-password").innerHTML = error.response.data.password[0]
                    } else {
                        document.getElementById("password").classList.remove("is-invalid")
                        document.getElementById("invalid-feedback-password").innerHTML = ""
                    }
                }
                console.log(error)

            })
    }

    render() {
        return (
            <MDBContainer className="mt-4 pb-4">
                <MDBRow>
                    <MDBCol size="6" className="offset-3">
                        <MDBCard>
                            <MDBCardBody>
                                <center>
                                    <h4>Register</h4>
                                    <img src="https://img.icons8.com/ultraviolet/50/000000/add-user-male.png" alt="" />
                                </center>
                                <form method="POST" onSubmit={this.handleSubmit}>
                                    <MDBInput name="username" className="form-control" id="username" autoComplete="off" label="Username" onChange={this.changeHandler}>
                                        <div className="invalid-feedback" id="invalid-feedback-username"></div>
                                    </MDBInput>

                                    <MDBInput name="password" type="password" id="password" className="form-control" label="Password" onChange={this.changeHandler}>
                                        <div className="invalid-feedback" id="invalid-feedback-password"></div>
                                    </MDBInput>
                                    <MDBBtn className="btn-block" type="submit">
                                        Register
                                    </MDBBtn>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        )
    }
}

export default Register
