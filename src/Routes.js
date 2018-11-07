import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dash from './views/Dash/Dash'
import CurrentUser from './CurrentUser/CurrentUser'
import Chat from './views/Chat/Chat'
import Post from './views/Post/Post'
import SignUp from './SignUp/SignUp'

export default function Routes(props) {
  // console.log('this.props', this.props)
  return (
    <Switch>
      <Route path="/dash" render={() => <Dash {...props && { ...props }} />} />
      <Route path="/currentUser" component={CurrentUser} />
      <Route path="/chat" component={Chat} />
      <Route path="/post" render={() => <Post {...props} />} />
      <Route path="/signUp" component={SignUp} />
      {props && props.isLoggedIn && <Redirect to="/dash" />} />
    </Switch>
  )
}

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}
