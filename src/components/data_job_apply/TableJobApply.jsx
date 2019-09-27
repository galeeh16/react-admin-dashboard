import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { MDBBtn, MDBIcon } from 'mdbreact';
import axios from 'axios';
import Spinner from '../Spinner';
import Pagination from "react-js-pagination";

export class TableJobApply extends Component {

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

        this.setState({ loading: true }, () => {
            axios.get('https://103.14.21.56:7443/api/v1/jobs/job-apply/' + '?limit=10&offset=' + offset, {
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

    deleteJobApply = async (id) => {
        if (window.confirm('Are you sure want to delete this apply job?')) {
            await this.setState({ loading: true }, () => {
                const https = require('https');
                const agent = new https.Agent({
                    rejectUnauthorized: false
                });

                axios({
                    method: 'DELETE',
                    url: 'https://103.14.21.56:7443/api/v1/jobs/job-apply/' + id + '/',
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
        let no = 0;
        let total = this.state.totalData;

        const jobApply = this.state.data.map((apply) => {
            no = no + 1;
            return (
                <tr key={apply.trx_job}>
                    <td className="text-center">{no}</td>
                    <td>{apply.username}</td>
                    <td>{apply.trx_job}</td>
                    <td>{apply.id_job}</td>
                    <td className="text-center">{apply.apply_date}</td>
                    <td>{apply.attachment_code}</td>
                    <td><a href={apply.url_attachment} target="_blank">{apply.url_attachment}</a></td>
                    <td className="text-center">
                        <Link to={{
                            pathname: '/business/job-apply/edit/'+apply.trx_job,
                            state: {
                                myPropsToggle: this.props.myPropsToggle,
                                id: apply.trx_job
                            }
                        }}>
                            <button type="button" className="btn btn-sm btn-purple" style={{ width: 'max-content', margin: 0 }}><MDBIcon icon="edit" size="md" /> Edit</button>
                        </Link>
                    </td>
                    <td className="text-center">
                        <button type="button" className="btn btn-sm btn-danger" onClick={this.deleteJobApply.bind(this, apply.trx_job)} style={{ width: 'max-content', margin: 0 }}><MDBIcon icon="trash" size="md" /> Delete</button>
                    </td>
                </tr>
            )
        });

        return (
            <div>
                <div className="table-repsonsive" style={{ width: '100%', overflowY: 'auto' }}>
                    <Link to={{
                        pathname: '/business/job-apply/add',
                        state: {
                            myPropsToggle: this.props.myPropsToggle,
                        }
                    }}>
                        <MDBBtn type="button" color="success"><MDBIcon icon="plus-circle" /> Add Job Apply</MDBBtn>
                    </Link>
                    <table className="table table-condensed">
                        <thead>
                            <tr className="text-center">
                                <th>No</th>
                                <th>Username</th>
                                <th>Trx Job</th>
                                <th>ID Job</th>
                                <th>Apply</th>
                                <th>Attach Code</th>
                                <th>Image</th>
                                <th>Edit</th>
                                <th>Delete</th>
                            </tr>
                        </thead>
                        <tbody>
                            {this.state.loading ? <tr><td colSpan="9" className="text-center"><Spinner /></td></tr> : jobApply}
                        </tbody>
                    </table>
                </div>

                <nav style={{ width: '100%', display: 'flex', marginTop: '2em', justifyContent: 'center' }}>
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

export default TableJobApply
