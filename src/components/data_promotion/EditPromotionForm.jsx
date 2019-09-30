import React, { Component } from 'react';
import { MDBInput, MDBCard, MDBCardBody, MDBCardTitle, MDBBtn } from 'mdbreact';
import axios from 'axios';
import Spinner from '../Spinner';

export class EditPromotionForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            loading: false,
            created_at: '',
            promotion_title: '',
            description: '',
            url_banner: '',
            expired_date: new Date(),
            errors: []
        }
    }

    async componentDidMount() {
        await this.setState({loading: true}, () => {
            const https = require('https');
            const agent = new https.Agent({
                rejectUnauthorized: false
            });

            axios.get('https://103.14.21.56:7443/api/v1/promotions/promotion/' + this.props.id, {
                httpsAgent: agent,
                headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
            })
            .then(response => {
                this.setState({
                    loading: false,
                    created_at: response.data.created_at,
                    promotion_title: response.data.promotion_title,
                    description: response.data.description,
                    url_banner: response.data.url_banner,
                    expired_date: response.data.expired_date
                })
            })
            .catch(error => {
                console.log(error.response)
            })
        })
    }


    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        }, 
        () => {console.log(this.state.expired_date)}
        )
    }

    fileHandler = (e) => {
        
        this.setState({ 
            url_banner: e.target.files[0] 
        }, () => {
            var reader = new FileReader();
            reader.onload = function(f) {
                let id_img = document.getElementById('url_preview_banner')
                id_img.setAttribute('src', f.target.result);
            }
            reader.readAsDataURL(this.state.url_banner);
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
        form.append('promotion_title', this.state.promotion_title);
        form.append('description', this.state.description);
        form.append('expired_date', this.state.expired_date);
        form.append('url_banner', this.state.url_banner);

        axios({
            method: 'PUT',
            url: 'https://103.14.21.56:7443/api/v1/promotions/promotion/' + this.props.id + '/', 
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
    

    render() {
        console.log(this.state.expired_date)
        
        let choose_file = this.state.url_banner === '' ? "Choose File" : this.state.url_banner.name
        let d = new Date(this.state.expired_date);
        let date = (d.getDate() < 10 ) ? ("0" + d.getDate()) : d.getDate();
        let month = (d.getMonth() < 10 ) ? ("0" + (d.getMonth() + 1)) : (d.getMonth() + 1);
        let expired_date = d.getFullYear() + '-' + month + '-' + date;
        console.log(d)
        console.log(expired_date)
        return (
            <div className={this.props.myPropsToggle ? "main-sidebar-inactive": "main"}>
                <MDBCard>
                    <MDBCardBody className="card-body col-6">
                        <MDBCardTitle className="teal-text">Edit Promotion</MDBCardTitle>

                        {this.state.loading ? <div style={{width: '100%', textAlign: 'center'}}><Spinner /></div> : <form onSubmit={this.handleSubmit} method="POST">

                            <MDBInput type="text" name="promotion_title" onChange={this.handleChange} label="Promotion Title" value={this.state.promotion_title} className={this.state.errors.promotion_title ? 'is-invalid': ''}>
                                { this.state.errors.promotion_title ? <span className="error-message">{this.state.errors.promotion_title[0]}</span> : '' }
                            </MDBInput>

                            <MDBInput type="textarea" name="description" onChange={this.handleChange} label="Description" value={this.state.description} className={this.state.errors.description ? 'is-invalid': ''}>
                                { this.state.errors.description ? <span className="error-message">{this.state.errors.description[0]}</span> : '' }
                            </MDBInput>

                            <div className="form-md">
                                <p>Image Banner</p>
                                <img src={this.state.url_banner} id="url_preview_banner" alt="" style={{width: '100px', marginBottom: '1em'}}/>
                            </div>

                            <div className="form-md">
                                <div className="input-group">
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="url_banner"
                                            className="custom-file-input"
                                            id="inputGroupFile01"
                                            ref="upload"
                                            onChange={this.fileHandler} 
                                            className={this.state.errors.url_banner ? 'is-invalid': ''}
                                            aria-describedby="inputGroupFileAddon01"
                                        />
                                        <label className="custom-file-label" htmlFor="inputGroupFile01">
                                            {choose_file}
                                        </label>
                                    </div>
                                </div>
                                <small id="expiredDateHelpText" className="form-text text-muted">
                                    Change image for promotion
                                </small>
                                <div className="error-message">{ this.state.errors.url_banner ? this.state.errors.url_banner[0] : ''}</div>
                            </div>

                            <MDBInput type="date" name="expired_date" className={this.state.errors.expired_date ? 'is-invalid' : ''}  value={expired_date} autoComplete="false" spellCheck="false" onChange={this.handleChange} className={this.state.errors.expired_date ? 'is-invalid': ''}> 
                                <small className="form-text text-muted">
                                    Change date that promotion will ends
                                </small>
                                <span className="error-message">{this.state.errors.expired_date ? this.state.errors.expired_date[0] : ''}</span>
                            </MDBInput>

                            <MDBBtn type="submit" color="purple">Submit</MDBBtn>

                        </form>}
                        
                    </MDBCardBody>
                </MDBCard>
            </div>
        )
    }
}

export default EditPromotionForm
