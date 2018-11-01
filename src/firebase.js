import firebase from 'firebase'
import Rebase from 're-base'

const config = {
  apiKey: 'AIzaSyA1dUY3nxeSrPklaaJM_iWNlG2dXq-uGMA',
  authDomain: 'post-its-app.firebaseapp.com',
  databaseURL: 'https://post-its-app.firebaseio.com',
  projectId: 'post-its-app',
  storageBucket: 'post-its-app.appspot.com',
  messagingSenderId: '910498215234',
}

const app = firebase.initializeApp(config)
const base = Rebase.createClass(app.database())

export { app, base }

export default firebase

export const database = firebase.database()
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const facebookAuthProiver = new firebase.auth.FacebookAuthProvider()
export const emailAndPassword = new firebase.auth.EmailAuthProvider()

// export const doCreateUserWithEmailAndPassword = (email, password) => {
//   auth.createUserWithEmailAndPassword(email, password)
// }

// export const doSignInWithEmailAndPassword = (email, password) => {
//   auth.signInWithEmailAndPassword(email, password)
// }
