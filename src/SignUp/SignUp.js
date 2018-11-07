import React, { Component } from 'react'
//import './SignUp.css';

class SignUp extends Component {
  constructor() {
    super()
    this.state = {}
  }
  render() {
    return (
      <div className="create-account-form">
        <h1>Create Account</h1>
        <form
          onSubmit={event => this.authWithEmailPassword(event)}
          ref={form => (this.loginForm = form)}
        >
          <label className="pt-label">
            Email:
            <input
              style={{ width: '100%' }}
              className="pt-input"
              name="email"
              type="email"
              ref={input => (this.emailInput = input)}
              placeholder="Insert Email..."
            />
          </label>
          <label className="pt-label">
            Password:
            <input
              style={{ width: '100%' }}
              className="pt-input"
              name="password"
              type="password"
              ref={input => (this.passwordInput = input)}
              placeholder="Insert Password..."
            />
          </label>
          <input style={{ width: '100%' }} type="submit" className="login--button" value="Log In" />
        </form>
      </div>
    )
  }
}
export default SignUp
