import React, { Component } from 'react';
import { MDBBtn, MDBIcon } from 'mdbreact';
import axios from 'axios';
import ModalUser from './ModalUser';
import { Link } from 'react-router-dom';
import Pagination from "react-js-pagination";
import Spinner from '../Spinner';

export class TableUser extends Component {
  constructor(props) {
    super(props)
    this.state = {
      activePage: 1,
      totalUsers: 1,
      curPage: 1,
      data: [],
      modal: false,
      loading: false,
    };
  }

  async suspendUser(id, username, is_active, password, email, telp, text) {
    if (window.confirm('Are you sure want to ' + text + ' ' + username + '?')) {
      const https = require('https');
      const agent = new https.Agent({
        rejectUnauthorized: false
      });

      await axios({
        method: 'PUT',
        url: 'https://103.14.21.56:7443/api/v1/users/user/' + id + '/',
        httpsAgent: agent,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') },
        data: {
          // id: id,
          is_active: is_active,
          username: username,
          password: password,
          confirm_password: password,
          email: email,
          telp: telp
        }
      })
      .then(response => {
        console.log(response)
        this.getData(this.state.activePage);
      })
      .catch(error => {
        console.log(error)
      });
    }
  }

  async getData(pageNumber) {
    let offset = (pageNumber - 1) * 10;
    console.log('offset =' + offset)

    const https = require('https');
    const agent = new https.Agent({
      rejectUnauthorized: false
    });

    await this.setState({ loading: true }, () => {
      axios.get('https://103.14.21.56:7443/api/v1/users/user/' + '?limit=10&offset=' + offset, {
        httpsAgent: agent,
        headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
      })
        .then(response => {
          console.log(response)
          this.setState({
            loading: false,
            data: response.data.results,
            totalUser: response.data.count
          })
        })
        .catch(error => {
          console.log(error);
        });
    });
  }

  verifiedUser = async (id_profile, url_photo, nik, name, gender, birth_location, birthdate, address, postal_code, faculty, department, generation, is_verified=false, is_forum=false, is_marketplace=false, username, id_country, id_province, id_district, id_village) => {
    if (window.confirm('Are you sure want to make this ' + username + ' verified?')) {
      const https = require('https');
      const agent = new https.Agent({
        rejectUnauthorized: false
      });

      let form = new FormData();
      form.append('id_profile', id_profile)
      // form.append('url_photo', '')
      form.append('nik', nik)
      form.append('name', name)
      form.append('gender', gender)
      form.append('birth_location', birth_location)
      form.append('birthdate', birthdate)
      form.append('address', address)
      form.append('postal_code', postal_code)
      form.append('faculty', faculty)
      form.append('department', department)
      form.append('generation', generation)
      form.append('is_verified', is_verified)
      form.append('is_forum', is_forum)
      form.append('is_marketplace', is_marketplace)
      form.append('username', username)
      form.append('id_country', id_country)
      form.append('id_province', id_province)
      form.append('id_district', id_district)
      form.append('id_village', id_village)

      await axios({
        method: 'PUT',
        url: 'https://103.14.21.56:7443/api/v1/users/user-profile/' + id_profile + '/',
        httpsAgent: agent,
        headers: { 
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
          'Content-Type': 'multipart/form-data'
        },
        data: form
      })
      .then(response => {
        console.log(response)
        this.getData(this.state.activePage);
      })
      .catch(error => {
        console.log(error.response)
      });
    }
  }

  deleteUser = async (id, username) => {
    if (window.confirm('Are you sure want to delete ' + username + '?')) {
      const https = require('https');
      const agent = new https.Agent({
        rejectUnauthorized: false
      });

      await axios({
        method: 'DELETE',
        url: 'https://103.14.21.56:7443/api/v1/users/user/' + id + '/',
        httpsAgent: agent,
        headers: { 
          'Authorization': 'Bearer ' + localStorage.getItem('token'),
        },
        // data: form
      })
      .then(response => {
        console.log(response)
        this.getData(this.state.activePage);
      })
      .catch(error => {
        console.log(error.response)
      });

    }
  }

  handlePageChange = (pageNumber) => {
    this.setState({
      activePage: pageNumber
    }, () => {
      this.getData(pageNumber);
    });
  }

  componentDidMount() {
    this.getData(1);
  }


  render() {
    let no = (this.state.activePage - 1) * 10 + 1;
    let total = this.state.totalUser;

    const tableTr = this.state.data.map((user) => {
      let active, suspend, verified;
      let profile = user.profile[0];

      if (user.is_active) {
        active = <MDBIcon icon="check-circle" className="green-text" />;
        suspend = <button type="button" className="btn btn-sm btn-elegant" onClick={this.suspendUser.bind(this, user.id, user.username, false, user.password, user.email, user.telp, 'suspend')} style={{ margin: '0', width: 'max-content' }}><MDBIcon icon="user-check" /> Suspend</button>;
      } else {
        active = <MDBIcon icon="plus-circle" className="red-text" style={{ transform: 'rotate(45deg)' }} />;
        suspend = <button type="button" className="btn btn-sm" onClick={this.suspendUser.bind(this, user.id, user.username, true, user.password, user.email, user.telp, 'unsuspend')} style={{ margin: '0', width: 'max-content' }}><MDBIcon icon="user-slash" /> Unsuspend</button>;
      }

      if ( profile.name !== null && profile.gender !== null && profile.birth_location !== null && profile.birthdate !== null && profile.address !== null && profile.postal_code !== null && profile.faculty !== null && profile.department !== null && profile.generation !== null && profile.id_country !== null && profile.id_prvince !== null && profile.id_district !== null && profile.id_village !== null && profile.is_verified == false) 
      {
        verified = <button type="button" 
                  className="btn btn-sm btn-success" 
                  onClick={ this.verifiedUser.bind(this, profile.id_profile, profile.url_photo, profile.nik, profile.name, profile.gender, profile.birth_location, profile.birthdate, profile.address, profile.postal_code, profile.faculty, profile.department, profile.generation, true, profile.is_forum, profile.is_marketplace, profile.username, profile.id_country, profile.id_province, profile.id_district, profile.id_village) } 
                  style={{ margin: '0', width: 'max-content' }}><MDBIcon icon="user-check" /> Verified</button>;
      } 
      else if( profile.name !== null && profile.gender !== null && profile.birth_location !== null && profile.birthdate !== null && profile.address !== null && profile.postal_code !== null && profile.faculty !== null && profile.department !== null && profile.generation !== null && profile.id_country !== null && profile.id_prvince !== null && profile.id_district !== null && profile.id_village !== null && profile.is_verified == true) 
      {
        verified = <MDBIcon icon="check-circle" className="green-text" />;
      } 
      else 
      {
        verified = <button type="button" className="btn btn-sm" style={{ margin: '0', width: 'max-content' }}><MDBIcon icon="user-slash" /> Verified</button>;
      }

      return (
        <tr key={user.id}>
          <td className="text-center">{no++}</td>
          <td style={{minWidth: '120px'}}>{user.username}</td>
          <td style={{minWidth: '180px'}}>{profile.name}</td>
          <td>{user.email}</td>
          <td style={{minWidth: '200px'}}>{profile.address}</td>
          <td className="text-center">{profile.gender}</td>
          <td>{user.telp}</td>
          <td className="text-center">{active}</td>
          <td className="text-center">{verified}</td>
          <td className="text-center">{suspend}</td>
          <td className="text-center">
            <Link to={{
              pathname: "/home/edit-user/" + user.id,
              state: {
                myPropsToggle: this.props.myPropsToggle
              }
            }}>
              <button type="button" className="btn btn-purple btn-sm waves-effect waves-light" style={{ margin: '0', width: 'max-content' }}><MDBIcon icon="edit" /> Edit</button>
            </Link>
          </td>
          <td>
            <MDBBtn type="button" className="btn-sm" color="danger" onClick={this.deleteUser.bind(this, user.id, user.username)} style={{ margin: '0', width: 'max-content' }}><MDBIcon icon="trash" /> Delete</MDBBtn>
          </td>
        </tr>
      )
    });

    return (
      <div>
        <div className="table-responsive" style={{ width: '100%', overflowY: 'auto' }}>
          <ModalUser modal={this.state.modal} modalClick={this.suspendUser} />
          <Link to={{
            pathname: "/home/add-user/",
            state: {
              myPropsToggle: this.props.myPropsToggle
            }
          }}>
            <MDBBtn type="button" color="success"><MDBIcon icon="plus-circle" /> Add User</MDBBtn>
          </Link>
          <table className="table table-hover">
            <thead>
              <tr className="text-center">
                <th>No</th>
                <th>Username</th>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Gender</th>
                <th>Telp</th>
                <th>Active</th>
                <th>Verified</th>
                <th>Suspend</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.loading ? <tr><td colSpan="12" className="text-center"><Spinner /></td></tr> : tableTr}
            </tbody>
          </table>

        </div>

        <nav style={{ display: 'flex', justifyContent: 'center', marginTop: '2em' }}>
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
    );
  }
}

export default TableUser
