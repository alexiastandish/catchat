import React, { Component } from 'react'
import { auth } from './firebase'
import CurrentUser from './CurrentUser/CurrentUser'
import SignIn from './SignIn/SignIn'
import { ClipLoader } from 'react-spinners'
import './App.scss'
// import { PropTypes } from 'prop-types'
import { BrowserRouter, Redirect } from 'react-router-dom'
// import SignUpPage from './SignUp/SignUp'
import axios from 'axios'
import Routes from './Routes'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
      // loading: true,
    }
    this.authStateChange = this.authStateChange.bind(this)
    this.authSignOut = this.authSignOut.bind(this)
    this.postUser = this.postUser.bind(this)
  }

  componentDidMount() {
    this.authStateChange()
  }

  authStateChange() {
    auth.onAuthStateChanged(currentUser => {
      // console.log('currentUser xxx', currentUser)
      if (currentUser !== null) {
        this.setState({ currentUser, loading: false }, this.postUser)
      }
    })
  }

  authSignOut() {
    auth.signOut()
    this.setState({ currentUser: null })
  }

  postUser() {
    console.log('posting current user')
    console.log('this.state.currentUser.uid', this.state.currentUser.uid)
    axios.post(`/api/currentUser/${this.state.currentUser.uid}`, {
      email: this.state.currentUser.email,
      userPhotoURL: this.state.currentUser.photoURL,
      displayName: this.state.currentUser.displayName,
    })
  }

  // addNewUserToTable() {
  //   axios.post(`/api/currentUser/${this.state.currentUser}`)
  // }

  render() {
    console.log('this.state', this.state)
    console.log('this.state.currentUser.UID', this.state.currentUser && this.state.currentUser.uid)

    const { currentUser, loading } = this.state
    if (loading === true) {
      return (
        <div style={{ textAlign: 'center', position: 'absolute', top: '25%', left: '50%' }}>
          <h3>Loading...</h3>
          <div>
            <ClipLoader />
          </div>
        </div>
      )
    }

    return (
      <BrowserRouter>
        <div className="App">
          {currentUser ? (
            <CurrentUser user={currentUser} signOut={this.authSignOut} />
          ) : (
            <div className="SignIn--page">
              <div className="SignIn--form">
                <SignIn />
              </div>
            </div>
          )}
          <Routes isLoggedIn={currentUser !== null} />
        </div>
      </BrowserRouter>
    )
  }
}

export default App
