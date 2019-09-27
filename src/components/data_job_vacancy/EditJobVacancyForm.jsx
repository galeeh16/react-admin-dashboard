import React, { Component } from 'react'
import { Redirect } from 'react-router-dom';
import { MDBRow, MDBCol, MDBCard, MDBCardBody, MDBCardTitle, MDBInput, MDBBtn } from "mdbreact";
import UserDropdown from "./UserDropdown";
import CategoryDropdown from "./CategoryDropdown";
import axios from 'axios';
import Spinner from  '../Spinner';

export class EditJobVacancyForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            username: '',
            title_joblist: '',
            company_name: '',
            experience_job: '',
            required_skill: '',
            function_job: '',
            type_job: '',
            desc: '',
            expired_date: '',
            id_category: '',
            image_job: '',
            usernameDropdown: [],
            categoryDropdown: [],
            errors: [],
            redirect: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    getAllCategory = () => {
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        axios.get('https://103.14.21.56:7443/api/v1/jobs/career-category/', {
            httpsAgent: agent,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
        .then(response => {
            this.setState({categoryDropdown: response.data})
        })
        .catch(error => {
            console.log(error.response)
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

    getJobVacancy = async () => {
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });
        await axios.get('https://103.14.21.56:7443/api/v1/jobs/job-vacancy/' + this.props.id + '/', {
            httpsAgent: agent,
            headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
        })
        .then(res => {
            let expired_date = res.data.expired_date 
            let ex = expired_date.split(" ")
            console.log(ex)
            this.setState({
                username: res.data.username,
                title_joblist: res.data.title_joblist,
                company_name: res.data.company_name,
                experience_job: res.data.experience_job,
                required_skill: res.data.required_skill,
                function_job: res.data.function_job,
                type_job: res.data.type_job,
                desc: res.data.desc,
                expired_date: ex[0],
                id_category: res.data.id_category,
                image_job: res.data.image_job,
            })
        })
        .catch(error => {
            console.log(error.response)
        })
    }

    componentDidMount() {
        this.getAllUser()
        this.getAllCategory()
        this.getJobVacancy()
    }

    handleSubmit = async (e) => {
        e.preventDefault()
        let expired = this.state.expired_date + ' 23:59:00+0700';
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        let form = new FormData();
        form.append('username', this.state.username)
        form.append('image_job', this.state.image_job)
        form.append('title_joblist', this.state.title_joblist)
        form.append('company_name', this.state.company_name)
        form.append('function_job', this.state.function_job)
        form.append('type_job', this.state.type_job)
        form.append('experience_job', this.state.experience_job)
        form.append('required_skill', this.state.required_skill)
        form.append('desc', this.state.desc)
        form.append('expired_date', expired)
        form.append('id_category', this.state.id_category)

        await this.setState({loading: true}, () => {
            axios({
                method: 'PUT',
                url: 'https://103.14.21.56:7443/api/v1/jobs/job-vacancy/' + this.props.id + '/',
                httpAgent: agent,
                headers: { 
                    'Authorization': 'Bearer ' + localStorage.getItem('token'),
                    'Content-Type': 'multipart/form-data'
                },
                data: form
            })
            .then(response => {
                this.setState({
                    redirect: true,
                    loading: false
                })
            })
            .catch(error => {
                console.log(error.response)
                this.setState({errors: error.response.data, loading: false})
            })
        })
        

    }

    render() {
        console.log(this.state.expired_date)
        let choose_file = this.state.image_job === '' ? "Choose Image" : this.state.image_job.name;

        const user = this.state.usernameDropdown.map(user => {
            return <UserDropdown key={user.id} user={user} />
        })

        const category = this.state.categoryDropdown.map(cat => {
            return <CategoryDropdown key={cat.id_category} category={cat} />
        })

        if (this.state.redirect === true) {
            return <Redirect to={{
                pathname: "/business/job-vacancy",
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
                                <MDBCardTitle className="teal-text">Edit Job Vacancy</MDBCardTitle>
                                <form method="POST" onSubmit={this.handleSubmit} encType="multipart/form-data">
                                    <MDBRow>
                                        <MDBCol size="6">
                                            <div className="form-group">
                                                <MDBInput type="text" name="title_joblist" label="Job Title" onChange={this.handleChange} autoComplete="off" value={this.state.title_joblist} className={this.state.errors.title_joblist ? 'is-invalid' : ''}>
                                                    {this.state.errors.title_joblist ? <span className="error-message">{this.state.errors.title_joblist[0]}</span> : ''}
                                                </MDBInput>

                                                <MDBInput type="text" name="company_name" label="Company Name" onChange={this.handleChange} autoComplete="off" value={this.state.company_name} className={this.state.errors.company_name ? 'is-invalid' : ''}>
                                                    {this.state.errors.company_name ? <span className="error-message">{this.state.errors.company_name[0]}</span> : ''}
                                                </MDBInput>

                                                <MDBInput type="text" name="function_job" label="Function Job" onChange={this.handleChange} autoComplete="off" value={this.state.function_job} className={this.state.errors.function_job ? 'is-invalid' : ''}>
                                                    {this.state.errors.function_job ? <span className="error-message">{this.state.errors.function_job[0]}</span> : ''}
                                                </MDBInput>

                                                <MDBInput type="text" name="experience_job" label="Experience Job" onChange={this.handleChange} autoComplete="off" value={this.state.experience_job} className={this.state.errors.experience_job ? 'is-invalid' : ''}>
                                                    {this.state.errors.experience_job ? <span className="error-message">{this.state.errors.experience_job[0]}</span> : ''}
                                                </MDBInput>

                                                <MDBInput type="text" name="required_skill" label="Required Skill" onChange={this.handleChange} autoComplete="off" value={this.state.required_skill} className={this.state.errors.required_skill ? 'is-invalid' : ''}>
                                                    {this.state.errors.required_skill ? <span className="error-message">{this.state.errors.required_skill[0]}</span> : ''}
                                                </MDBInput>

                                                <MDBInput type="textarea" name="desc" label="Description" onChange={this.handleChange} autoComplete="off" value={this.state.desc} className={this.state.errors.desc ? 'is-invalid' : ''}>
                                                    {this.state.errors.desc ? <span className="error-message">{this.state.errors.desc[0]}</span> : ''}
                                                </MDBInput>

                                                <MDBInput type="date" name="expired_date" onChange={this.handleChange} autoComplete="off" value={this.state.expired_date} className={this.state.errors.expired_date ? 'is-invalid' : ''}>
                                                    <small className="form-text text-muted">Select date that job vacancy will ends </small>
                                                    {this.state.errors.expired_date ? <span className="error-message">{this.state.errors.expired_date[0]}</span> : ''}
                                                </MDBInput>


                                            </div>
                                        </MDBCol>

                                        <MDBCol size="6">
                                            <div className="form-group">
                                                <div className="form-md">
                                                    <label htmlFor="username" className={this.state.errors.username ? 'error-message': ''}>User</label>
                                                    <select className={this.state.errors.username ? 'form-control is-invalid' : 'form-control'} value={this.state.username} onChange={this.handleChange} name="username" id="username">
                                                        {/* <option value="">Choose user</option> */}
                                                        {user}
                                                    </select>
                                                    {this.state.errors.username ? <span className="error-message">{this.state.errors.username[0]}</span> : ''}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="form-md">
                                                    <label htmlFor="type_job" className={this.state.errors.type_job ? 'error-message': ''}>Job Type</label>
                                                    <select className={this.state.errors.type_job ? 'form-control is-invalid' : 'form-control'} value={this.state.type_job} onChange={this.handleChange} name="type_job" id="type_job">
                                                        {/* <option value="">Choose job type</option> */}
                                                        <option value="Part Time">Part Time</option>
                                                        <option value="Full Time">Full Time</option>
                                                    </select>
                                                    {this.state.errors.type_job ? <span className="error-message">{this.state.errors.type_job[0]}</span> : ''}
                                                </div>
                                            </div>

                                            <div className="form-group">
                                                <div className="form-md">
                                                    <label htmlFor="id_category" className={this.state.errors.id_category ? 'error-message': ''}>Category</label>
                                                    <select className={this.state.errors.id_category ? 'form-control is-invalid' : 'form-control'} value={this.state.id_category} onChange={this.handleChange} name="id_category" id="id_category">
                                                        {/* <option value="">Choose job category</option> */}
                                                        {category}
                                                    </select>
                                                    {this.state.errors.id_category ? <span className="error-message">{this.state.errors.id_category[0]}</span> : ''}
                                                </div>
                                            </div>

                                            <div className="from-group form-md" style={{ marginTop: '2em' }}>
                                                <div className="input-group">
                                                    <div className="custom-file">
                                                        <input
                                                            type="file"
                                                            name="image_job"
                                                            className="custom-file-input"
                                                            id="inputGroupFile01"
                                                            ref="upload"
                                                            accept="image/*"
                                                            onChange={this.handleImage}
                                                            className={this.state.errors.image_job ? 'is-invalid' : ''}
                                                            aria-describedby="inputGroupFileAddon01"
                                                        />
                                                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                            {choose_file}
                                                        </label>
                                                    </div>
                                                </div>
                                                <small className="form-text text-muted">
                                                    Change image for job vacancy
                                                </small>
                                                {this.state.errors.image_job ? <div className="error-message">{this.state.errors.image_job[0]}</div> : ''}
                                            </div>

                                        </MDBCol>
                                    </MDBRow>

                                    {this.state.loading ? <MDBBtn type="button" color="purple" style={{padding: '0.4rem 2.12rem' }}><Spinner/></MDBBtn> : <MDBBtn type="submit" color="purple">Save</MDBBtn>}
                                </form>
                            </MDBCardBody>
                        </MDBCard>
                    </MDBCol>
                </MDBRow>
            </div>
        )
    }
}

export default EditJobVacancyForm
