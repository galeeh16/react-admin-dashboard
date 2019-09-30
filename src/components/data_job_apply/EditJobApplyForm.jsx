import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn, MDBIcon } from 'mdbreact'
import UserDropdown from '../data_job_vacancy/UserDropdown';
import JobDropdown from './JobDropdown';
import Axios from 'axios';
import Spinner from '../Spinner';

export class EditJobApplyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            id_job: '',
            url_attachment: '',
            redirect: false,
            loading: false,
            loadingJob: false,
            loadingUser: false,
            users: [],
            jobs: [],
            errors: [],
        }
    }

    componentDidMount() {
        this.getAllJob()
        this.getAllUser()  
        this.getJobApply()  
    }

    getJobApply = async () => {
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        await Axios.get('https://103.14.21.56:7443/api/v1/jobs/job-apply/' + this.props.id, {
            httpAgent: agent,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res => {
            this.setState({
                username: res.data.username,
                id_job: res.data.id_job,
                url_attachment: res.data.url_attachment
            })
        })
        .catch(err => {
            console.log(err.response)
        })
    }

    getAllJob = async () => {
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        await this.setState({loadingJob: true}, () => {
            Axios.get('https://103.14.21.56:7443/api/v1/jobs/job-vacancy/', {
            httpAgent: agent,
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('token')
            }
            })
            .then(res => {
                this.setState({
                    loadingJob: false,
                    jobs: res.data,
                })
            })
            .catch(err => {
                console.log(err.response)
            })
        })
    }

    getAllUser = async () => {
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        await this.setState({loadingUser: true}, () => {
            Axios.get('https://103.14.21.56:7443/api/v1/users/user/', {
                httpAgent: agent,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(res => {
                this.setState({
                    loadingUser: false,
                    users: res.data
                })
            })
            .catch(err => {
                console.log(err.response)
            })
        })
    }

    handleChange = (e) => {
        this.setState({ [e.target.name] :  e.target.value })
    }

    fileHandler = (e) => {
        this.setState({ 
            url_attachment: e.target.files[0] 
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        
        await this.setState({loading: true}, () => {
            const https = require('https');
            const agent = new https.Agent({
                rejectUnauthorized: false
            });

            let form = new FormData();
            form.append('username', this.state.username)
            form.append('id_job', this.state.id_job)
            form.append('url_attachment', this.state.url_attachment)

            Axios({
                method: 'PUT',
                url: 'https://103.14.21.56:7443/api/v1/jobs/job-apply/' + this.props.id + '/',
                httpAgent: agent,
                headers: {
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                },
                data: form
            })
            .then(res => {
                this.setState({
                    loading: false,
                    redirect: true
                })
            })
            .catch(err => {
                console.log(err.response)
                this.setState({
                    loading: false,
                    errors: err.response.data
                })
            })
        })
    }

    render() {
        let choose_file = this.state.url_attachment === '' ? "Choose File" : this.state.url_attachment.name

        const users = this.state.users.map(user => {
            return <UserDropdown key={user.id} user={user} />
        })

        const jobs = this.state.jobs.map(job => {
            return <JobDropdown key={job.id_job} job={job} />
        })

        if(this.state.redirect === true) {
            return <Redirect to={{
                pathname: '/business/job-apply',
                state: {
                    myPropsToggle: this.props.myPropsToggle
                }
            }} />
        }

        return (
            <div className={this.props.myPropsToggle ? "main-sidebar-inactive": "main"}>
                <MDBCard>
                    <MDBCardBody className="col-md-6 col-sm-12" style={{ minHeight: 'calc(100vh - 91px)' }}>
                        <MDBCardTitle className="teal-text">Edit Job Apply</MDBCardTitle>
                        <form method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">
                            <div className="form-group form-md">
                                <select name="username" id="username" className={this.state.errors.username ? "form-control is-invalid" : "form-control"} onChange={this.handleChange} value={this.state.username}>
                                    {this.state.loadingUser ? <option>Loading...</option> : users}
                                </select>
                                {this.state.errors.username ? <span className="error-message">{this.state.errors.username[0]}</span> : ''}
                            </div>

                            <div className="form-group form-md">
                                <select name="id_job" id="id_job" className={this.state.errors.id_job ? "form-control is-invalid" : "form-control"} onChange={this.handleChange} value={this.state.id_job}>
                                    {this.state.loadingUser ? <option>Loading...</option> : jobs}
                                </select>
                                {this.state.errors.id_job ? <span className="error-message">{this.state.errors.id_job[0]}</span> : ''}
                            </div>

                            <div className="form-md">
                                <div className="input-group">
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="url_attachment"
                                            className="custom-file-input"
                                            id="inputGroupFile01"
                                            ref="upload"
                                            onChange={this.fileHandler} 
                                            className={this.state.errors.url_attachment ? 'is-invalid': ''}
                                            aria-describedby="inputGroupFileAddon01"
                                        />
                                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                                            {choose_file}
                                        </label>
                                    </div>
                                </div>
                                <small id="expiredDateHelpText" className="form-text text-muted">
                                    Choose pdf file
                                </small>
                                <div className="error-message">{ this.state.errors.url_attachment ? this.state.errors.url_attachment[0] : ''}</div>
                            </div>

                            {this.state.loading ? <MDBBtn type="button" color="purple" style={{padding: '0.5rem 2.12rem', marginTop: '2em' }}><Spinner /></MDBBtn> : <MDBBtn type="submit" color="purple" style={{marginTop: '2em'}}>Submit</MDBBtn>}
                        </form>
                    </MDBCardBody>
                </MDBCard>
            </div>
        )
    }
}

export default EditJobApplyForm
