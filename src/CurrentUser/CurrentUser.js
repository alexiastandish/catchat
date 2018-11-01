import React from 'react'
import { auth } from '../firebase'
import PropTypes from 'prop-types'
import './CurrentUser.scss'

const CurrentUser = ({ user }) => {
  return (
    <div className="CurrentUser">
      <img className="CurrentUser--photo" src={user.photoURL} alt={user.displayName} />

      <div className="CurrentUser--identification">
        <h3>{user.displayName}</h3>
        <button onClick={() => auth.signOut()}>Sign Out</button>
      </div>
    </div>
  )
}

CurrentUser.propTypes = {
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    uid: PropTypes.string.isRequired,
  }),
}

export default CurrentUser
