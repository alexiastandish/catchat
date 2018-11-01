import React, { Component } from 'react'
import { auth, googleAuthProvider, twitterAuthProvider } from '../firebase'
import { withRouter } from 'react-router-dom'
import './SignIn.scss'

// import { doCreateUserWithEmailAndPassword } from '../auth/auth'

const SignInPage = ({ history }) => (
  <div>
    <SignIn history={history} />
    {/* <PasswordForgetLink />
    <SignUpLink /> */}
  </div>
)

const INITIAL_STATE = { email: '', password: '', error: null }
const updateByPropertyName = (propertyName, value) => () => ({
  [propertyName]: value,
})

class SignIn extends Component {
  constructor(props) {
    super(props)
    this.state = { ...INITIAL_STATE }
  }

  // onSubmit(event) {
  //   const { email, password } = this.state
  //   const { history } = this.props

  //   auth
  //     .doSignInWithEmailAndPassword(email, password)
  //     .then(() => {
  //       this.setState(() => ({ ...INITIAL_STATE }))
  //       history.push(routes.HOME)
  //     })
  //     .catch(error => {
  //       this.setState(updateByPropertyName('error', error))
  //     })

  //   event.preventDefault()
  // }

  render() {
    const { email, password, error } = this.state
    const isInvalid = password === '' || email === ''
    return (
      <div className="SignIn">
        <div className="sign-in-header">
          <img src="http://i65.tinypic.com/28chc93.png" />
          <h1>Kitty City</h1>
        </div>

        <div className="sign-in-body">
          {/* <form onSubmit={this.onSubmit}>
            <p>Username:</p>
            <input
              value={email}
              onChange={event => this.setState(updateByPropertyName('email', event.target.value))}
              placeholder="Email"
            />

            <p>Password:</p>
            <input
              value={password}
              onChange={event =>
                this.setState(updateByPropertyName('password', event.target.value))
              }
              placeholder="Password"
            />
            <button disabled={isInvalid} type="submit">
              Sign In
            </button>

            {error && <p>{error.message}</p>}
          </form> */}
          {/* <h3>OR</h3> */}

          <button style={{}} onClick={() => auth.signInWithPopup(twitterAuthProvider)}>
            Sign In With Twitter
          </button>
          <button style={{}} onClick={() => auth.signInWithPopup(googleAuthProvider)}>
            Sign In With Google
          </button>
        </div>
      </div>
    )
  }
}

export default withRouter(SignInPage)

export { SignIn }
