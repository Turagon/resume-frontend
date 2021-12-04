import React, { Component } from 'react'
import axios from 'axios'
import './login.css'
import store from '../../redux/store'

export default class Login extends Component {
  state = {
    name: '',
    password: '',
    nameWarning: false,
    passwordWarning: false,
    isLoading: false
  }

  handleSubmit = e => {
    e.preventDefault()
    const { name, password } = this.state
    if (!name) {
      return this.setState({ nameWarning: true })
    }
    
    if (!password) {
      return this.setState({ passwordWarning: true })
    }
    
    this.setState({ isLoading: true })
    axios.post('https://rex-resume.herokuapp.com/', {name, password})
    .then(response => {
      if (response.data.status === 'error') {
        this.setState({ isLoading: false })
        store.dispatch({ type: 'editError', data: response.data.message })
        store.dispatch({ type: 'editDisplay', data: false })
        return
      }

      const token = response.data.token
      const { name, type } = response.data.user
      store.dispatch({type: 'editGeneralUsername', data: name})
      localStorage.setItem('token', token)
      if (type === 'user') {
        this.resetError()
        return this.props.history.push('/resume-frontend/user')
      } else if (type === 'admin') {
        this.resetError()
        return this.props.history.push('/resume-frontend/admin')
      }
    })
    .catch(err => {
      this.setState({ isLoading: false })
      store.dispatch({ type: 'editError', data: err.message })
      store.dispatch({ type: 'editDisplay', data: false })
    })
  } 
  
  resetError = () => {
    this.setState({ isLoading: false })
    store.dispatch({ type: 'editError', data: '' })
    store.dispatch({ type: 'editDisplay', data: true })
    return 
  }

  handleNameChange = e => {
    const name = e.target.value
    this.setState({ name })
  }

  handlePasswordChange = e => {
    const password = e.target.value
    this.setState({ password })
  }

  render() {
    const { nameWarning, passwordWarning, isLoading } = this.state
    const { error, display } = store.getState().generalReducer
    return (
      <div className="login-container">
        <div className="login">
          <h3 style={{ display: isLoading ? 'none' : 'block' }}>Thank you for visiting my resume</h3>
          <h3 style={{ display: isLoading ? 'block' : 'none' }}>Loading</h3>
          <div style={{ display: display ? 'none' : 'block' }} className="login-warning">
            <span>{error}</span>
            <button onClick={this.resetError}>X</button>
          </div>
          <form onSubmit={this.handleSubmit} className="login-form">
            <div className="input-name-box">
              <label htmlFor="input-name"><i className="far fa-user"></i>Name</label>
              <input onChange={ this.handleNameChange } onFocus={() => this.setState({nameWarning: false})} type="text" maxLength="40" id="input-name" name="name" placeholder="case sensitive"/>
              <span style={{ display: nameWarning ? 'block' : 'none' }}>name can't be empty</span>
            </div>

            <div className="input-password-box">
              <label htmlFor="input-password"><i className="fas fa-key"></i>Password</label>
              <input onChange={this.handlePasswordChange} onFocus={() => this.setState({ passwordWarning: false })} type="password" maxLength="40" id="input-password" name="password" placeholder="case sensitive"/>
              <span style={{ display: passwordWarning ? 'block' : 'none' }}>password can't be empty</span>
            </div>

            <button type="submit" className="signin-btn">Submit</button>
          </form>
        </div>
      </div>
    )
  }
}
