// export const LANDING = '/'
// export const SIGN_UP = '/signup'
// export const SIGN_IN = '/signin'
// export const PASSWORD_FORGET = '/pw-forget'
// export const HOME = '/home'
// export const ACCOUNT = '/account'

import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import CurrentUser from './CurrentUser/CurrentUser'

export default function Routes() {
  return (
    <Switch>
      <Route path="/dash" component={CurrentUser} />
      <Redirect to="/" />
    </Switch>
  )
}
