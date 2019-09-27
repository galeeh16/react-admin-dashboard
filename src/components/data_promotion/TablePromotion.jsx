import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Pagination from "react-js-pagination";
import Spinner from '../Spinner';


export class TablePromotion extends Component {
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

    async getData(pageNum) {

        await this.setState({ loading: true }, () => {
            const https = require('https');
            const agent = new https.Agent({
                rejectUnauthorized: false
            });

            let offset = (pageNum - 1) * 10;

            axios.get('https://103.14.21.56:7443/api/v1/promotions/promotion/' + '?limit=10&offset=' + offset, {
                httpsAgent: agent,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
            })
                .then(response => {
                    console.log(response)
                    this.setState({
                        loading: false,
                        data: response.data.results,
                        totalData: response.data.count
                    })
                })
                .catch(error => {
                    console.log(error);
                });
        })

    }

    deletePromo = async (id) => {
        if (window.confirm('Are you sure want to delete this promo?')) {
            await this.setState({ loading: true }, () => {
                const https = require('https');
                const agent = new https.Agent({
                    rejectUnauthorized: false
                });

                axios({
                    method: 'DELETE',
                    url: 'https://103.14.21.56:7443/api/v1/promotions/promotion/' + id + '/',
                    httpAgent: agent,
                    headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
                })
                .then(response => {
                    console.log(response)
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
        this.setState({ activePage: pageNumber });
    }

    componentDidMount() {
        this.getData(1);
    }

    render() {
        let total = this.state.totalData;
        let no = (this.state.activePage - 1) * 10 + 1;

        const dataPromo = this.state.data.map((promo, value) => {
            return (
                <tr key={promo.id_promotion}>
                    <td className="text-center">{no++}</td>
                    <td>{promo.id_promotion}</td>
                    <td>{promo.promotion_title}</td>
                    <td>{promo.description}</td>
                    <td><img src={promo.url_banner} alt="" style={{ width: '60px' }} /></td>
                    <td>{promo.created_at}</td>
                    <td>{promo.expired_date}</td>
                    <td>{promo.expired_text}</td>
                    <td>
                        <Link to={{
                            pathname: "/promotion/edit-promotion/" + promo.id_promotion,
                            state: {
                                myPropsToggle: this.props.myPropsToggle
                            }
                        }}>
                            <button type="button" className="btn btn-sm btn-purple" style={{ width: 'max-content', margin: 0 }}><i className="fa fa-edit"></i> Edit</button>
                        </Link>
                    </td>
                    <td>
                        <button type="button" className="btn btn-sm btn-danger" onClick={this.deletePromo.bind(this, promo.id_promotion)} style={{ width: 'max-content', margin: 0 }}><i className="fa fa-trash-alt"></i> Delete</button>
                    </td>
                </tr>
            )
        });

        return (
            <div>
                <div className="table-responsive" style={{ width: '100%', overflowY: 'auto' }}>
                    <Link to={{
                        pathname: "/promotion/add-promotion/",
                        state: {
                            myPropsToggle: this.props.myPropsToggle
                        }
                    }}>
                        <button type="button" className="btn btn-success"><i className="fa fa-plus-circle"></i> Add Promotion</button>
                    </Link>
                    <table className="table">
                        <thead>
                            <tr className="text-center">
                                <th>No</th>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Description</th>
                                <th>Image</th>
                                <th>Created</th>
                                <th>Expired</th>
                                <th>Expired Text</th>
                                <th colSpan="2">Action</th>
                            </tr>
                        </thead>
                        <tbody>

                            {this.state.loading ? <tr><td colSpan="10" className="text-center"><Spinner /></td></tr> : dataPromo}
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

export default TablePromotion
