const newUser = (req, res) => {
  const db = req.app.get('db')
  const { email, userPhotoURL, displayName } = req.body
  const { userId } = req.params
  // console.log('req.params', req.params)
  // console.log('req.body', req.body)
  db.user
    .getUser(userId)
    .then(response => {
      console.log('response', response)
      if (!response[0]) {
        db.user.addNewUser([userId, email, userPhotoURL, displayName])
      }
    })
    .catch(err => console.log('err', err))
}

const getCurrentUser = (req, res) => {
  const db = req.app.get('db')
  db.user.getUser(req.params.userId).then(response => {
    console.log('response', response)
  })
}

module.exports = {
  getCurrentUser,
  newUser,
}

// passport.serializeUser((user, done) => {
//   const db = app.get('db')
//   db.getUserByUID([currentUser.uid])
//     .then(response => {
//       console.log(response)
//       if (!response[0]) {
//         console.log(response)
//         db.addUserByAuthid([user.displayName, user.id, user.email])
//           .then(res => done(null, res[0]))
//           .catch(console.log)
//       } else return done(null, response[0])
//     })
//     .catch(console.log)
// })
