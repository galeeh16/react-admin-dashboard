import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn } from "mdbreact";
import UserDropdown from '../data_job_vacancy/UserDropdown';
import JobDropdown from './JobDropdown';
import axios from 'axios';
import Spinner from "../Spinner";

export class AddJobApplyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            url_attachment: '',
            id_job: '',
            jobDropdown: [],
            usernameDropdown: [],
            errors: [],
            loading: false,
            redirect: false,
        }
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        await this.setState({loading: true}, () => {
            let form = new FormData();
            form.append('username', this.state.username)
            form.append('id_job', this.state.id_job)
            form.append('url_attachment', this.state.url_attachment)

            axios({
                method: 'POST',
                url: 'https://103.14.21.56:7443/api/v1/jobs/job-apply/',
                httpsAgent: agent,
                headers: { 
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                },
                data: form
            })
            .then(response => {
                this.setState({
                    redirect: true, 
                    loading: false,
                    redirect: true
                })
            })
            .catch(error => {
                console.log(error.response)
                this.setState({errors: error.response.data, loading: false})
            });
        })
        
    }

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleImage = (e) => {
        this.setState({ 
            url_attachment: e.target.files[0] 
        })
    }

    getAllUser = async () => {
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        await axios.get('https://103.14.21.56:7443/api/v1/users/user/', {
            httpsAgent: agent,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
        .then(response => {
            this.setState({usernameDropdown: response.data})
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    getAllJob = async () => {
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        await axios.get('https://103.14.21.56:7443/api/v1/jobs/job-vacancy/', {
            httpsAgent: agent,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
        .then(response => {
            this.setState({jobDropdown: response.data})
        })
        .catch(error => {
            console.log(error.response)
        });
    }

    componentDidMount() {
        this.getAllUser();
        this.getAllJob();
    }

    render() {
        const user = this.state.usernameDropdown.map(user => {
            return <UserDropdown key={user.id} user={user} />
        })

        const job = this.state.jobDropdown.map(job => {
            return <JobDropdown key={job.id_job} job={job} />
        })

        let choose_file = this.state.url_attachment === '' ? "Choose Image" : this.state.url_attachment.name;

        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: "/business/job-apply",
                state: {
                    myPropsToggle: this.props.myPropsToggle
                }
            }} />
        }

        return (
            <div className={this.props.myPropsToggle ? "main-sidebar-inactive" : "main"}>
                <MDBRow style={{ minHeight: 'calc(100vh - 95px)' }}>
                    <MDBCol size="12">
                        <MDBCard style={{ minHeight: '100%' }}>
                            <MDBCardBody>
                                <MDBCardTitle className="teal-text">Add Job Apply</MDBCardTitle>
                                <form method="POST" onSubmit={this.handleSubmit}>
                                    <div className="form-group from-md">
                                        <select name="username" id="username" className="form-control" onChange={this.handleChange}>
                                            <option value="">Choose User</option>
                                            {user}
                                        </select>
                                        <small className="form-text text-muted">Select user who apply this job </small>
                                        {this.state.errors.username ? <span className="error-message">{this.state.errors.username[0]}</span> : ''}
                                    </div>
                                    <div className="form-group from-md">
                                        <select name="id_job" id="id_job" className="form-control" onChange={this.handleChange}>
                                            <option value="">Choose Job</option>
                                            {job}
                                        </select>
                                        <small className="form-text text-muted">Select job user</small>
                                        {this.state.errors.id_job ? <span className="error-message">{this.state.errors.id_job[0]}</span> : ''}
                                    </div>
                                    <div className="from-group form-md" style={{marginTop: '2em'}}>
                                        <div className="input-group">
                                            <div className="custom-file">
                                                <input
                                                    type="file"
                                                    name="url_attachment"
                                                    className="custom-file-input"
                                                    id="inputGroupFile01"
                                                    ref="upload"
                                                    accept="application/pdf"
                                                    onChange={this.handleImage} 
                                                    className={this.state.errors.url_attachment ? 'is-invalid' : ''}
                                                    aria-describedby="inputGroupFileAddon01"
                                                />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                    {choose_file}
                                                </label>
                                            </div>
                                        </div>
                                        <small id="expiredDateHelpText" className="form-text text-muted">
                                            Choose image for job vacancy
                                        </small>
                                        { this.state.errors.url_attachment ? <div className="error-message">{ this.state.errors.url_attachment[0] }</div> : ''}
                                    </div>
                                    <div className="from-group">
                                        {this.state.loading ? <MDBBtn type="button" color="purple" style={{padding: '0.4rem 2.12rem' }}><Spinner/></MDBBtn> : <MDBBtn type="submit" color="purple">Submit</MDBBtn>}
                                    </div>
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default AddJobApplyForm
