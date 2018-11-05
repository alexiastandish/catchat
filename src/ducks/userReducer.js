import axios from 'axios'

const GET_USER_BY_UID = 'GET_USER_BY_UID'

export function getUserByUID(uid) {
  return {
    type: GET_USER_BY_UID,
    payload: axios
      .get(`/api/currentUser/${uid}`)
      .then(res => res.data)
      .catch(err => {
        console.log('err', err)
      }),
  }
}

const initialState = {
  user: {},
}

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case `${GET_USER_BY_UID}_FULFILLED`:
      return {
        ...action.payload,
      }

    default:
      return state
  }
}
