const newPost = (req, res) => {
  console.log('req.body', req.body)
  const { userId, postSubject, postBody } = req.body
  const db = req.app.get('db')
  db.posts.newPost([userId, postSubject, postBody]).then(response => {
    console.log('response', response)
  })
  return res.status(200).send('okie dokie')
}

// const newImagePost = (req, res) => {
//   console.log('req.body', req.body)
//   const { userId, postSubject, imageCaption, imageURL } = req.body
//   const db = req.app.get('db')
//   db.posts.newPost([userId, postSubject])

//   db.posts.newImagePost([imageCaption, imageURL])
// }

module.exports = {
  newPost,
  // newImagePost,
}
