import React from 'react'
import PropTypes from 'prop-types'
import './CurrentUser.scss'
import { Link } from 'react-router-dom'

function CurrentUser({ signOut, user }) {
  console.log('user', user)
  return (
    <div className="CurrentUser">
      <div className="CurrentUser--container">
        <img className="CurrentUser--photo" src={user.photoURL} alt={user.displayName} />

        <div className="CurrentUser--identification">
          <h3 className="username">{user.displayName}</h3>

          <Link to="/dash">
            <i id="CurrentUser--button" className="fa fa-2x fa-home icon--button" />
          </Link>
          <br />

          <Link to="/post/post">
            <i id="CurrentUser--button" className="fa fa-2x fa-plus-circle icon--button" />
          </Link>
          <br />
          <Link to="/chat">
            <i id="CurrentUser--button" className="fa fa-2x fa-comments icon--button" />
          </Link>
        </div>

        <Link to="/" className="btn-hover color-1">
          <button className="btn-hover color-1" onClick={signOut}>
            Sign Out
          </button>
        </Link>
      </div>
    </div>
  )
}

CurrentUser.propTypes = {
  signOut: PropTypes.func.isRequired,
  user: PropTypes.shape({
    displayName: PropTypes.string,
    email: PropTypes.string.isRequired,
    photoURL: PropTypes.string,
    uid: PropTypes.string.isRequired,
  }),
}

export default CurrentUser
