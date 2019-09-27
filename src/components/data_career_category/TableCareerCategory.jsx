import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../Spinner';
import { MDBIcon, MDBBtn } from 'mdbreact';
import Pagination from "react-js-pagination";

export class TableCareerCategory extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [],
            loading: false,
            activePage: 1,
            totalData: 1,
            curPage: 1,
        }
        console.log(props)
    }

    async getData(pageNum) {
        await this.setState({loading: true}, () => {
            const https = require('https');
            const agent = new https.Agent({
                rejectUnauthorized: false
            });

            let offset = (pageNum - 1) * 10;
            
            this.setState({loading: true}, () => {
                axios.get('https://103.14.21.56:7443/api/v1/jobs/career-category/' + '?limit=10&offset=' + offset, {
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
        })
    }

    deleteCareerCategory = async (id, category) => {
        if (window.confirm('Are you sure want to delete this category ' + category + '?')) {
            await this.setState({ loading: true }, () => {
                const https = require('https');
                const agent = new https.Agent({
                    rejectUnauthorized: false
                });

                axios({
                    method: 'DELETE',
                    url: 'https://103.14.21.56:7443/api/v1/jobs/career-category/' + id + '/',
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

    handlePageChange = (pageNumber) => {
        this.getData(pageNumber);
        console.log(`active page is ${pageNumber}`);
        this.setState({activePage: pageNumber});
    }

    componentDidMount() {
        this.getData(1);    
    }

    render() {
        let no = (this.state.activePage - 1) * 10 + 1;
        let total = this.state.totalData;

        const category = this.state.data.map((cat) => {
            return (
                <tr key={cat.id_category}>
                    <td className="text-center">{no++}</td>
                    <td>{cat.id_category}</td>
                    <td>{cat.category}</td>
                    <td className="text-center"><img src={cat.url_image} alt="" style={{width: '40px'}} /></td>
                    <td width="12%" className="text-center">
                        <Link to={{
                            pathname: "/business/career-category/edit/" + cat.id_category,
                            state: {
                                id: cat.id_category,
                                myPropsToggle: this.props.myPropsToggle
                            }
                        }}>
                            <button type="button" className="btn btn-purple btn-sm" style={{ width: 'max-content', margin: 0 }}><MDBIcon icon="edit" /> Edit</button>
                        </Link>
                    </td>
                    <td width="12%" className="text-center">
                        <button type="button" className="btn btn-danger btn-sm" onClick={this.deleteCareerCategory.bind(this, cat.id_category, cat.category)} style={{ width: 'max-content', margin: 0 }}><MDBIcon icon="trash" /> Delete </button>
                    </td>
                </tr>
            )
        })

        return (
            <div className="table-responsive">
                <Link to={{
                    pathname: "/business/career-category/add",
                    state: {
                        myPropsToggle: this.props.myPropsToggle,
                        show: this.props.show
                    }
                }}>
                    <MDBBtn color="success"><i className="fa fa-plus-circle"></i> Add Category</MDBBtn>
                </Link>
                <table className="table table-condensed">
                    <thead>
                        <tr className="text-center">
                            <th>No</th>
                            <th>ID Category</th>
                            <th>Category</th>
                            <th>Image</th>
                            <th>Edit</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.loading ? <tr><td colSpan="46" className="text-center"><Spinner /></td></tr> : category}
                    </tbody>
                </table>
                
                <nav style={{ display: 'flex', justifyContent: 'center' }}>
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

export default TableCareerCategory
