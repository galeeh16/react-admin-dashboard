import React, { Component } from 'react';
import { MDBInput, MDBCol } from 'mdbreact';
import axios from 'axios';
import { Redirect } from 'react-router-dom';

export class AddPromotionForm extends Component {
    state = {
        promotion_title: '',
        description: '',
        expired_date: '',
        url_banner: '',
        errors: [],
    }

    changeHandler = (event) => {
        this.setState({ [event.target.name]: event.target.value }, () => {console.log(this.state.expired_date)})
    }

    fileHandler = (e) => {
        this.setState({ 
            url_banner: e.target.files[0] 
        })
    }

    submitHandler = (event) => {
        event.preventDefault() 
        let token = localStorage.getItem('token');

        const https = require('https');
        const agent = new https.Agent({
            rejectUnauthorized: false
        });

        let expired = this.state.expired_date + ' 00:00:00+0700';

        let form = new FormData();
        form.append('promotion_title', this.state.promotion_title);
        form.append('description', this.state.description);
        form.append('expired_date', expired);
        form.append('url_banner', this.state.url_banner);

        axios({
            method: 'POST',
            url: 'https://103.14.21.56:7443/api/v1/promotions/promotion/', 
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
            this.setState({errors: error.response.data})    
        });
    }

    render() {
        if(this.state.redirect) {
            return(<Redirect to="/promotion" />);
        }

        console.log(this.props.myPropsToggle)

        let choose_file = this.state.url_banner === '' ? "Choose File" : this.state.url_banner.name

        return (
            <div className={this.props.myPropsToggle ? "main-sidebar-inactive": "main"} style={{height: 'calc(100vh - 60px)' }}>
                <div className="card" style={{ height: '100%' }}>
                    <div className="card-body" style={{ height: '100%' }}>
                        <MDBCol size="6">
                            <p className="card-title teal-text">Add Promotion</p>

                            <form action="" method="POST" onSubmit={this.submitHandler} encType="multipart/form-data">
                                <div className="form-group">

                                    <MDBInput type="text" label="Promotion Title" size="md" value={this.state.promotion_title} onChange={this.changeHandler} name="promotion_title" autoComplete="off" className={this.state.errors.promotion_title ? 'is-invalid' : ''}>
                                        <span className="error-message">{this.state.errors.promotion_title ? this.state.errors.promotion_title[0] : ''}</span>
                                    </MDBInput>

                                    <MDBInput type="textarea" label="Description" size="md" value={this.state.description} onChange={this.changeHandler} name="description" autoComplete="off" className={this.state.errors.description ? 'is-invalid' : ''}>
                                        <span className="error-message">{this.state.errors.description ? this.state.errors.description[0] : ''}</span>
                                    </MDBInput>

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
                                                    // value={this.state.url_banner}
                                                    aria-describedby="inputGroupFileAddon01"
                                                />
                                                <label className="custom-file-label" htmlFor="inputGroupFile01">
                                                    {choose_file}
                                                </label>
                                            </div>
                                        </div>
                                        <small id="expiredDateHelpText" className="form-text text-muted">
                                            Choose image for promotion
                                        </small>
                                        <div className="error-message">{ this.state.errors.url_banner ? this.state.errors.url_banner[0] : ''}</div>
                                    </div>

                                    <MDBInput type="date" name="expired_date" className={this.state.errors.expired_date ? 'is-invalid' : ''} value={this.state.expired_date} autoComplete="false" spellCheck="false" onChange={this.changeHandler}> 
                                        <small className="form-text text-muted">
                                            Select date that promotion will ends
                                        </small>
                                        <span className="error-message">{this.state.errors.expired_date ? this.state.errors.expired_date[0] : ''}</span>
                                    </MDBInput>

                                    <button type="submit" className="btn btn-purple">Submit</button>
                                </div>
                            </form>
                        </MDBCol>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddPromotionForm
