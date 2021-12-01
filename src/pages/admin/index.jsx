import React, { Component } from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import store from '../../redux/store'
import MyNavLink from '../../components/NavLinks'
import UserList from '../../components/admin/userList'
import WorkExp from '../../components/admin/workExp'
import Education from '../../components/admin/education'
import PersonInfo from '../../components/admin/personInfo'
import Skill from '../../components/admin/skills'
import CoverLetter from '../../components/admin/coverLetter'
import Portfolio from '../../components/admin/portfolios'
import Certificate from '../../components/admin/certificates'
import './admin.css'

export default class Admin extends Component {

  handleLogout = () => {
    localStorage.removeItem('token')
    return this.props.history.push('/')
  }

  render() {
    const { username } = store.getState().generalReducer

    return (
      <div className="admin">
        <header className="admin-header">
          <div className="admin-header-box">
            <span>{username}</span>
            <button onClick={this.handleLogout}><i className="fas fa-sign-out-alt"></i></button>
          </div>
        </header>
        <div className="admin-links">
          <MyNavLink to='/resume-frontend/admin/user'>User List</MyNavLink>
          <MyNavLink to='/resume-frontend/admin/workExp'>Work Exps</MyNavLink>
          <MyNavLink to='/resume-frontend/admin/education'>Education</MyNavLink>
          <MyNavLink to='/resume-frontend/admin/skill'>Skills</MyNavLink>
          <MyNavLink to='/resume-frontend/admin/personInfo'>Personal Info</MyNavLink>
          <MyNavLink to='/resume-frontend/admin/portfolio'>Portfolios</MyNavLink>
          <MyNavLink to='/resume-frontend/admin/coverletter'>Cover Letter</MyNavLink>
          <MyNavLink to='/resume-frontend/admin/certificate'>Certificates</MyNavLink>
        </div>
        <div>
          <Switch>
            <Route path="/resume-frontend/admin/user" component={UserList} />
            <Route path="/resume-frontend/admin/workExp" component={WorkExp} />
            <Route path="/resume-frontend/admin/education" component={Education} />
            <Route path="/resume-frontend/admin/skill" component={Skill} />
            <Route path="/resume-frontend/admin/personInfo" component={PersonInfo} />
            <Route path="/resume-frontend/admin/portfolio" component={Portfolio} />
            <Route path="/resume-frontend/admin/coverletter" component={CoverLetter} />
            <Route path="/resume-frontend/admin/certificate" component={Certificate} />
            <Redirect to="/resume-frontend/admin/user" />
          </Switch>
        </div>
      </div>
    )
  }
}
