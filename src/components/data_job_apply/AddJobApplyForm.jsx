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
            body_messages: '',
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
            axios({
                method: 'POST',
                url: 'https://103.14.21.56:7443/api/v1/jobs/job-apply/',
                httpsAgent: agent,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
                data: {
                    username: this.state.username,
                    id_job: this.state.id_job,
                    body_messages: this.state.body_messages
                }
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
                                    <div className="form-group">
                                        <MDBInput type="textarea" name="body_messages" label="Body Message" onChange={this.handleChange} autoComplete="off" className={this.state.errors.body_messages ? 'is-invalid' : ''}>
                                            {this.state.errors.body_messages ? <span className="error-message">{this.state.errors.body_messages[0]}</span> : ''}
                                        </MDBInput>
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
