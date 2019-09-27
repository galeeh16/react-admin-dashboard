import React, { Component } from "react";
import "./App.css";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home";
import Login from "./components/Login";

import User from "./components/data_user/User";
import EditUser from "./components/data_user/EditUser";
import AddUser from "./components/data_user/AddUser";

import Promotion from "./components/data_promotion/Promotion";
import AddPromotion from "./components/data_promotion/AddPromotion";
import EditPromotion from "./components/data_promotion/EditPromotion";
// import Career from "./components/data_career/Career";

import CareerCategory from "./components/data_career_category/CareerCategory";
import AddCareerCategory from "./components/data_career_category/AddCareerCategory";
import EditCareerCategory from "./components/data_career_category/EditCareerCategory";

import JobVacancy from "./components/data_job_vacancy/JobVacancy";
import AddJobVacancy from "./components/data_job_vacancy/AddJobVacancy";
import EditJobVacancy from "./components/data_job_vacancy/EditJobVacancy";

import JobApply from "./components/data_job_apply/JobApply";
import AddJobApply from "./components/data_job_apply/AddJobApply";
import EditJobApply from "./components/data_job_apply/EditJobApply";

import NotFound from './components/NotFound';

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={Login} />

          <Route exact path="/home" component={User} />
          <Route path="/home/add-user/" component={AddUser} />
          <Route path="/home/edit-user/:id" component={EditUser} />
          
          <Route exact path="/promotion" component={Promotion} />
          <Route path="/promotion/add-promotion/" component={AddPromotion} />
          <Route path="/promotion/edit-promotion/:id" component={EditPromotion} />

          {/* <Route exact path="/business" component={Career} /> */}
          <Route exact path="/business/career-category" component={CareerCategory} />
          <Route exact path="/business/career-category/add" component={AddCareerCategory} />
          <Route exact path="/business/career-category/edit/:id" component={EditCareerCategory} />

          <Route exact path="/business/job-vacancy" component={JobVacancy} />
          <Route exact path="/business/job-vacancy/add" component={AddJobVacancy} />
          <Route exact path="/business/job-vacancy/edit/:id" component={EditJobVacancy} />

          <Route exact path="/business/job-apply" component={JobApply} />
          <Route exact path="/business/job-apply/add" component={AddJobApply} />
          <Route exact path="/business/job-apply/edit/:id" component={EditJobApply} />

          <Route exact path="/login" component={Login} />
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
