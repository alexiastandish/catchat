import firebase from 'firebase'

const config = {
  apiKey: 'AIzaSyA1dUY3nxeSrPklaaJM_iWNlG2dXq-uGMA',
  authDomain: 'post-its-app.firebaseapp.com',
  databaseURL: 'https://post-its-app.firebaseio.com',
  projectId: 'post-its-app',
  storageBucket: 'post-its-app.appspot.com',
  messagingSenderId: '910498215234',
}

firebase.initializeApp(config)

export default firebase

export const database = firebase.database()
export const auth = firebase.auth()
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider()
export const twitterAuthProvider = new firebase.auth.TwitterAuthProvider()
export const emailAndPassword = new firebase.auth.EmailAuthProvider()

export const doCreateUserWithEmailAndPassword = (email, password) => {
  auth.createUserWithEmailAndPassword(email, password)
}

export const doSignInWithEmailAndPassword = (email, password) => {
  auth.signInWithEmailAndPassword(email, password)
}
