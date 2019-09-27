import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Spinner from '../Spinner';
import { MDBIcon, MDBBtn } from 'mdbreact';
import axios from 'axios';
import Pagination from "react-js-pagination";


export class TableJobVacancy extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            activePage: 1,
            totalData: 1,
            curPage: 1,
        }
    }

    componentDidMount() {
        this.getData(1);
    }

    handlePageChange = (pageNumber) => {
        this.getData(pageNumber);
        console.log(`active page is ${pageNumber}`);
        this.setState({ activePage: pageNumber });
    }

    async getData(pageNum) {
        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        let offset = (pageNum - 1) * 10;

        await this.setState({ loading: true }, () => {
            axios.get('https://103.14.21.56:7443/api/v1/jobs/job-vacancy/' + '?limit=10&offset=' + offset, {
                httpsAgent: agent,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            })
                .then(response => {
                    console.log(response.data);
                    this.setState({
                        loading: false,
                        data: response.data.results,
                        totalData: response.data.count
                    })
                })
                .catch(error => {
                    console.log(error);
                });
        });
    }

    deleteJobVacancy = async (id, job) => {
        if (window.confirm('Are you sure want to delete this job ' + job + '?')) {
            await this.setState({ loading: true }, () => {
                const https = require('https');
                const agent = new https.Agent({
                    rejectUnauthorized: false
                });

                axios({
                    method: 'DELETE',
                    url: 'https://103.14.21.56:7443/api/v1/jobs/job-vacancy/' + id + '/',
                    httpAgent: agent,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                })
                    .then(response => {
                        this.getData(this.state.activePage)
                    })
                    .catch(error => {
                        console.log(error);
                    });

            })
        }
    }

    render() {
        let total = this.state.totalData;
        let no = 0;

        const jobvacancy = this.state.data.map((job) => {
            no = no + 1;

            return (
                <tr key={job.id_job}>
                    <td>{no}</td>
                    <td>{job.category_name}</td>
                    <td>{job.company_name}</td>
                    <td>{job.type_job}</td>
                    <td>{job.function_job}</td>
                    <td>{job.required_skill}</td>
                    <td>{job.title_joblist}</td>
                    <td>{job.username}</td>
                    <td>{job.created_at}</td>
                    <td>{job.expired_date}</td>
                    <td className="text-center">
                        <Link to={{
                            pathname: "/business/job-vacancy/edit/" + job.id_job,
                            state: {
                                myPropsToggle: this.props.myPropsToggle,
                                id: job.id_job
                            }
                        }}>
                            <button type="button" className="btn btn-sm btn-purple" title="Edit" style={{ width: 'max-content', margin: 0 }}><i className="fa fa-edit"></i> Edit</button>
                        </Link>
                    </td>
                    <td className="text-center">
                        <button type="button" className="btn btn-sm btn-danger" title="Delete" onClick={this.deleteJobVacancy.bind(this, job.id_job, job.title_joblist)} style={{ width: 'max-content', margin: 0 }}><i className="fa fa-trash-alt"></i> Delete</button>
                    </td>
                </tr>
            )
        });

        return (
            <div>
                <div className="table-responsive" style={{ width: '100%', overflowY: 'auto' }}>
                    <Link to={{
                        pathname: "/business/job-vacancy/add/",
                        state: {
                            myPropsToggle: this.props.myPropsToggle
                        }
                    }}>
                        <MDBBtn type="button" color="success"><MDBIcon icon="plus-circle" size="md" /> Add Job Vacancy</MDBBtn>
                    </Link>
                    <table className="table table-condensed">
                        <thead>
                            <tr className="text-center">
                                <th>No</th>
                                <th>Category</th>
                                <th>Company</th>
                                <th>Type Job</th>
                                <th>Function Job</th>
                                <th>Required Skill</th>
                                <th>Title Job List</th>
                                <th>User</th>
                                <th>Created</th>
                                <th>Expired</th>
                                <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.loading ? <tr><td colSpan="12" className="text-center"><Spinner /></td></tr> : jobvacancy}
                        </tbody>
                    </table>
                </div>
                <nav style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
                    <Pagination
                        activePage={this.state.activePage}
                        itemsCountPerPage={10}
                        totalItemsCount={total}
                        pageRangeDisplayed={5}
                        onChange={this.handlePageChange}
                        innerClass="pagination pagination-circle pg-red"
                        itemClass="page-item"
                        linkClass="page-link waves-effect waves-effect"
                        prevPageText="&laquo;"
                        nextPageText="&raquo;"
                        firstPageText="First"
                        lastPageText="Last"
                    />
                </nav>
            </div>
        )
    }
}

export default TableJobVacancy
