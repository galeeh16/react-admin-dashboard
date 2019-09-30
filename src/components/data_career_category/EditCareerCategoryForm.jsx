import React, { Component } from 'react';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn } from 'mdbreact';
import axios from 'axios';

export class EditCareerCategoryForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            category: '',
            url_image: '',
            redirect: false,
            loading: false,
            errors: [],
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name] : e.target.value
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
            method: 'PUT',
            url: 'https://103.14.21.56:7443/api/v1/jobs/career-category/' + this.props.id + '/', 
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
            console.log(error.response);
            this.setState({errors: error.response.data})    
        });
    }

    async componentDidMount() {
        await this.setState({loading: true}, () => {
            const https = require('https');
            const agent = new https.Agent({
                rejectUnauthorized: false
            });

            axios.get('https://103.14.21.56:7443/api/v1/jobs/career-category/' + this.props.id, {
                httpsAgent: agent,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            })
            .then(response => {
                this.setState({
                    loading: false,
                    category: response.data.category,
                    url_image: response.data.url_image,
                });
            })
            .catch(error => {
                console.log(error.response)
            })
        })
    }

    render() {
        return (
            <div className={this.props.myPropsToggle ? "main-sidebar-inactive" : "main"}>
                <MDBRow style={{ minHeight: 'calc(100vh - 95px)' }}>
                    <MDBCol>
                        <MDBCard style={{ minHeight: '100%' }}>
                            <MDBCardBody className="col-6">
                                <MDBCardTitle className="teal-text">Edit Career Category</MDBCardTitle>
                                <form method="POST" onSubmit={ this.handleSubmit }>

                                    <MDBInput type="text" name="category" onChange={this.handleChange} label="Category" autoComplete="off">
                                    {this.state.errors.category ? <span className="career-category">{this.state.errors.category[0]}</span> : ''}
                                    </MDBInput>

                                    <div className="form-md">
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    name="url_image"
                                                    className="custom-file-input"
                                                    id="inputGroupFile01"
                                                    ref="upload"
                                                    onChange={this.handleFile} 
                                                    className={this.state.errors.url_image ? 'is-invalid': ''}
                                                    aria-describedby="inputGroupFileAddon01"
                                                />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                    {/* {choose_file} */}
                                                </label>
                                            </div>
                                        </div>
                                        <small id="expiredDateHelpText" className="form-text text-muted">
                                            Change image for career category
                                        </small>
                                        <div className="error-message">{ this.state.errors.url_image ? this.state.errors.url_image[0] : ''}</div>
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

export default EditCareerCategoryForm
