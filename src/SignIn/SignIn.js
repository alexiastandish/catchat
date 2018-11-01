import React, { Component } from 'react'
import { auth, googleAuthProvider, facebookAuthProiver, app } from '../firebase'
import { withRouter } from 'react-router-dom'
import './SignIn.scss'
import { Redirect } from 'react-router-dom'
import { Toaster, Intent, Position } from '@blueprintjs/core'

const SignInPage = ({ history }) => (
  <div>
    <SignIn history={history} />
    {/* <PasswordForgetLink />
    <SignUpLink /> */}
  </div>
)

const INITIAL_STATE = { email: '', password: '', error: null }
// const updateByPropertyName = (propertyName, value) => () => ({
//   [propertyName]: value,
// })

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = {
      ...INITIAL_STATE,
      redirect: false,
    }
    this.authWithEmailPassword = this.authWithEmailPassword.bind(this)
  }

  authWithEmailPassword(event) {
    event.preventDefault()
    const email = this.emailInput.value
    const password = this.passwordInput.value

    app
      .auth()
      .fetchProvidersForEmail(email)
      .then(providers => {
        if (providers.length === 0) {
          // create user
          return app.auth().createUserWithEmailAndPassword
        } else if (providers.indexOf('password') === -1) {
          // they used facebook
          this.loginForm.reset()
          this.toaster.show({
            intent: Intent.WARNING,
            message: 'Try alternative login...',
          })
        } else {
          // sign user in
          return app.auth().signInWithEmailAndPassword(email, password)
        }
      })
      .then(user => {
        if (user && user.email) {
          this.loginForm.reset()
          this.setState({ redirect: true })
        }
      })
      .catch(error => {
        this.toaster.show({ intent: Intent.DANGER, message: error.message })
      })
  }

  render() {
    if (this.state.redirect === true) {
      return <Redirect to="/dash" />
    }
    // const { email, password, error } = this.state
    // const isInvalid = password === '' || email === ''
    return (
      <div className="SignIn">
        <Toaster
          className="toaster"
          position={Position.TOP_RIGHT}
          ref={element => (this.toaster = element)}
        />
        <div className="sign-in-header">
          <img src="http://i65.tinypic.com/28chc93.png" />
          <h1>Kitten Krazy</h1>
        </div>

        <div className="sign-in-body">
          <button style={{}} onClick={() => auth.signInWithPopup(facebookAuthProiver)}>
            Log In With Facebook
          </button>
          <button style={{}} onClick={() => auth.signInWithPopup(googleAuthProvider)}>
            Log In With Google
          </button>
        </div>
        <div className="create-account-form">
          {/* <h4>OR</h4> */}
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
            <input style={{ width: '100%' }} type="submit" className="pt-button" value="Log In" />
          </form>
        </div>
      </div>
    )
  }
}

export default withRouter(SignInPage)

export { SignIn }
