// export const LANDING = '/'
// export const SIGN_UP = '/signup'
// export const SIGN_IN = '/signin'
// export const PASSWORD_FORGET = '/pw-forget'
// export const HOME = '/home'
// export const ACCOUNT = '/account'

import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect } from 'react-router-dom'
import Dash from './views/Dash/Dash'
// import SignIn from './SignIn/SignIn'
import CurrentUser from './CurrentUser/CurrentUser'
import Chat from './views/Chat/Chat'
import Post from './views/Post/Post'
import ImagePost from './views/Post/ImagePost'
import PostPost from './views/Post/PostPost'

export default function Routes(props) {
  console.log('props.isLoggedIn', props.isLoggedIn)
  return (
    <Switch>
      <Route path="/dash" component={Dash} />
      {/* <Route path="/signIn" component={SignIn} /> */}
      <Route path="/currentUser" component={CurrentUser} />
      <Route path="/chat" component={Chat} />
      <Route path="/post" component={Post} />
      <Route path="/post/post" component={PostPost} />
      <Route path="/post/image" component={ImagePost} />
      <Route render={() => props && props.isLoggedIn && <Redirect to="/dash" />} />

      {/* <Redirect??? /> */}
    </Switch>
  )
}

Routes.propTypes = {
  isLoggedIn: PropTypes.bool.isRequired,
}
