import React, { Component } from 'react';
import { MDBInput, MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBBtn } from 'mdbreact';
import axios from 'axios';
import {Redirect} from 'react-router-dom';

export class EditUserForm extends Component {
    // constructor(props) {
    //     super(props)
        state = {
            id: '',
            username: '',
            id_profile: '',
            nik: '',
            name: '',
            email: '',
            address: '',
            generation: 0,
            gender: '',
            telp: '',
            active: '',
            photo: '',
            redirect: false,
            error: false
        }
    // }

    submitHandler = (event) => {
        event.preventDefault();
        document.querySelector(".form-control").classList.remove("invalid");
        console.log('clicked');
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        axios({
            method: 'PUT',
            url: 'https://103.14.21.56:7443/api/v1/users/user-profile/' + this.state.id_profile + '/',
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            httpsAgent: agent,
            data: {
                id: this.state.id,
                username: this.state.username,
                id_profile: this.state.id_profile,
                nik: this.state.nik,
                name: this.state.name,
                email: this.state.email,
                address: this.state.address,
                generation: this.state.generation,
                gender: this.state.gender,
                telp: this.state.telp,
                is_active: this.state.active, 
                url_photo: null,
            }
        })
        .then(response => {
            console.log(response);
            document.querySelector(".error-message").innerHTML = '';
            document.querySelector(".form-control").classList.remove("invalid");

            this.setState({
                redirect: true,
                error: false
            });
        })
        .catch(error => {
            document.getElementsByClassName("error-message").innerHTML = '';
            document.querySelector(".form-control").classList.remove('.invalid');

            this.setState({error: true})
            Object.entries(error.response.data).map((key, val) => {
                this.addErrorToField(key[0], key[1][0]);
            });
        });
    }

    addErrorToField = (name='', msg='') => {
        if(this.state.error === true) {
            var el = document.querySelector('[name="'+name+'"]')
            // el.classList.remove('invalid');
            // el.classList.add('invalid');

            document.querySelector(".error-" + name).innerHTML = msg;
        }
    }

    async componentDidMount() {
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        await axios.get('https://103.14.21.56:7443/api/v1/users/user/' + this.props.id, {
            httpsAgent: agent,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        })
        .then(response => {
            // console.log(response.data);
            this.setState({
                id: response.data.id,
                id_profile: response.data.profile[0].id_profile,
                nik: response.data.profile[0].nik === null ? '' : response.data.profile[0].nik,
                username: response.data.username,
                name: response.data.profile[0].name === null ? '' : response.data.profile[0].name,
                email: response.data.email,
                address: response.data.profile[0].address === null ? '' : response.data.profile[0].address,
                gender: response.data.profile[0].gender === null ? 'L' : response.data.profile[0].gender,
                generation: response.data.profile[0].generation === null ? 0 : response.data.profile[0].generation,
                telp: response.data.telp,
                active: response.data.is_active
            });
            // console.log(this.state)
        })
        .catch(error => {
            console.log(error.response);
        });
    }

    changeHandler = event => {
        this.setState({ [event.target.name]: event.target.value });
    }

    changeRadio = nr => () => {
        // console.log('jenis = ' +nr)
        this.setState({
            gender: nr,
        });
    }

    render() {
        // console.log(this.state.radio)
        if(this.state.redirect) {
            return(<Redirect to="/home" />);
        }

        return (
            <div className={this.props.myPropsToggle ? "main-sidebar-inactive" : "main"}>
                <MDBCol style={{ padding: '0' }}>
                    <MDBCard style={{ width: '100%' }}>
                        <MDBCardBody>
                            <MDBCardTitle className="teal-text">Edit User</MDBCardTitle>
                            <form method="POST" onSubmit={this.submitHandler} noValidate>
                                <MDBRow>
                                    <MDBCol size="6">
                                        <div className="form-group">
                                            <MDBInput label="Username" size="md" value={this.state.username} onChange={this.changeHandler} name="username">
                                                <span className="error-username error-message"></span>
                                            </MDBInput>

                                            <MDBInput label="NIK" size="md" value={this.state.nik} onChange={this.changeHandler} name="nik" autoComplete="off">
                                                <span className="error-nik error-message"></span>
                                            </MDBInput>

                                            <MDBInput label="Name" size="md" value={this.state.name} onChange={this.changeHandler} name="name">
                                                <span className="error-name error-message"></span>
                                            </MDBInput>

                                            <MDBInput label="Email" size="md" value={this.state.email} onChange={this.changeHandler} name="email">
                                                <span className="error-email error-message"></span>
                                            </MDBInput>

                                            <MDBInput label="Address" type="textarea" size="md" rows="4" value={this.state.address} onChange={this.changeHandler} name="address">
                                                <span className="error-address error-message"></span>
                                            </MDBInput>

                                            <div className="form-inline">
                                                <MDBInput onClick={this.changeRadio('L')} onChange={this.changeHandler} checked={this.state.gender === 'L' ? true : false} label="Laki-laki" value="L" type="radio" id="radio1" />
                                                <MDBInput onClick={this.changeRadio('P')} onChange={this.changeHandler} checked={this.state.gender === 'P' ? true : false} label="Perempuan" value="P" type="radio" id="radio2" />
                                                <p className="error-gender error-message"></p>
                                            </div>

                                            <MDBInput label="Generation" type="number" size="md" value={this.state.generation} onChange={this.changeHandler} name="generation" style={{'WebkitAappearance': 'none'}}>
                                                <span className="error-generation error-message"></span>
                                            </MDBInput>
 
                                            <MDBInput label="Telp" size="md" value={this.state.telp} onChange={this.changeHandler} name="telp">
                                                <span className="error-telp error-message"></span>
                                            </MDBInput>
                                            {/* <MDBInput label="Active" size="md" value={this.state.active} name="" /> */}
                                            <MDBBtn type="submit" className="btn" color="secondary">Save</MDBBtn>
                                        </div>
                                    </MDBCol>
                                    {/* <MDBCol size="6">
                                        <div className="form-group">
                                            <MDBInput label="Small input" size="sm" />
                                        </div>
                                    </MDBCol> */}
                                </MDBRow>
                            </form>
                        </MDBCardBody>
                    </MDBCard>
                </MDBCol>
            </div>
        )
    }
}

export default EditUserForm
