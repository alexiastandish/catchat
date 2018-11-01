import React, { Component } from 'react'
import { auth, database } from './firebase'
import CurrentUser from './CurrentUser/CurrentUser'
import Dash from './Dash/Dash'
import SignIn from './SignIn/SignIn'
import { ClipLoader } from 'react-spinners'
import './App.scss'
import { BrowserRouter } from 'react-router-dom'
import Navigation from './Navigation'
import SignUpPage from './SignUp/SignUp'

class Application extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
      loading: true,
    }
  }
  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      console.log('currentUser', currentUser)
      this.setState({ currentUser, loading: false })
    })
  }

  render() {
    const { currentUser } = this.state
    if (this.state.loading === true) {
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
        <div>
          {/* <Navigation /> */}

          <div className="App">
            {!currentUser && (
              <div className="SignIn--page">
                <div className="SignIn--form">
                  <SignIn />
                </div>
              </div>
            )}
            {currentUser && (
              <div>
                <CurrentUser user={currentUser}>
                  <Dash />
                </CurrentUser>
              </div>
            )}
          </div>
        </div>
      </BrowserRouter>
    )
  }
}

export default Application
