import React, { Component } from 'react'
import { auth, database } from './firebase'
import CurrentUser from './CurrentUser/CurrentUser'
import Dash from './Dash/Dash'
import SignIn from './SignIn/SignIn'
import './App.scss'
import { BrowserRouter } from 'react-router-dom'

class Application extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: null,
    }
  }
  componentDidMount() {
    auth.onAuthStateChanged(currentUser => {
      console.log('currentUser', currentUser)
      this.setState({ currentUser })
    })
  }

  render() {
    const { currentUser } = this.state

    return (
      <BrowserRouter>
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
      </BrowserRouter>
    )
  }
}

export default Application
