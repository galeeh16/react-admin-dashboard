import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn } from 'mdbreact';
import axios from 'axios';

export class AddCareerCategoryForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            category: '',
            url_image: '',
            errors: [],
            redirect: false
        }
       
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
        })
    }

    handleImage = (e) => {
        this.setState({ 
            url_image: e.target.files[0] 
        })
    }

    handleSubmit = (e) => {
        e.preventDefault();
        let token = localStorage.getItem('token');

        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        let form = new FormData();
        form.append('category', this.state.category);
        form.append('url_image', this.state.url_image);

        axios({
            method: 'POST',
            url: 'https://103.14.21.56:7443/api/v1/jobs/career-category/', 
            httpsAgent: agent,
            headers: {
                'Authorization': 'Bearer ' + token, 
                'Content-Type': 'multipart/form-data'
            },
            data: form
        })
        .then(response => {
            this.setState({redirect: true});
        })
        .catch(error => {
            this.setState({errors: error.response.data})    
        });
    }

    render() {
        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: "/business/career-category",
                state: {
                    myPropsToggle: this.props.myPropsToggle
                }
            }} />
        }

        let choose_file = this.state.url_image === '' ? "Choose File" : this.state.url_image.name
        return (
            <div className={this.props.myPropsToggle ? "main-sidebar-inactive" : "main"}>
                <MDBRow>
                    <MDBCol>
                        <MDBCard style={{height: 'calc(100vh - 95px)'}}>
                            <MDBCardBody className="col-6">
                                <MDBCardTitle className="teal-text">Add Career Category</MDBCardTitle>
                                <form method="POST" onSubmit={this.handleSubmit}>

                                    <MDBInput type="text" name="category" label="Category" autoComplete="off" onChange={this.handleChange} value={this.state.category} className={this.state.errors.category ? 'is-invalid' : ''}>
                                        {this.state.errors.category ? <span className="error-message">{this.state.errors.category[0]}</span> : ''}
                                    </MDBInput>

                                    <div className="form-md">
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    name="url_banner"
                                                    className="custom-file-input"
                                                    id="inputGroupFile01"
                                                    ref="upload"
                                                    onChange={this.handleImage} 
                                                    className={this.state.errors.url_image ? 'is-invalid' : ''}
                                                    aria-describedby="inputGroupFileAddon01"
                                                />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                    {choose_file}
                                                </label>
                                            </div>
                                        </div>
                                        <small id="expiredDateHelpText" className="form-text text-muted">
                                            Choose image for promotion
                                        </small>
                                        { this.state.errors.url_image ? <div className="error-message">{ this.state.errors.url_image[0] }</div> : ''}
                                    </div>

                                    <MDBBtn type="submit" color="purple" style={{ marginTop: '2em' }}>Submit</MDBBtn>

                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default AddCareerCategoryForm
