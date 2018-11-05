import React, { Component } from 'react'
import { auth } from './firebase'
import CurrentUser from './CurrentUser/CurrentUser'
import SignIn from './SignIn/SignIn'
import { ClipLoader } from 'react-spinners'
import './App.scss'
import store from './ducks/store'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'
import Routes from './Routes'
import { Provider } from 'react-redux'

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
      currentUserInfo: {},
      loading: true,
    }
    this.authStateChange = this.authStateChange.bind(this)
    this.authSignOut = this.authSignOut.bind(this)
    this.postUser = this.postUser.bind(this)
    this.getCurrentUser = this.getCurrentUser.bind(this)
  }

  componentDidMount() {
    this.authStateChange()
    // this.getCurrentUser()
  }

  getCurrentUser() {
    axios.get(`/api/currentUser/${this.state.currentUser.uid}`).then(response => {
      console.log('response', response)
    })
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

  render() {
    console.log('this.state', this.state)

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
      <Provider store={store}>
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
            <Routes user={currentUser} isLoggedIn={currentUser !== null} />
          </div>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App
