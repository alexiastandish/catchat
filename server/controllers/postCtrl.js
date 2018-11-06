const newPost = (req, res) => {
  const { userId, postSubject, postBody } = req.body
  const db = req.app.get('db')
  db.posts.newPost([userId, postSubject, postBody])
  return res.status(200).send('okie dokie')
}

const newImagePost = async (req, res) => {
  const db = req.app.get('db')
  const { userId, postSubject, imageCaption, imageURL } = req.body
  const post = await db.posts.newPostForImage([userId, postSubject])
  // console.log('POST', post)
  const { post_id: imagePostId } = post[0]
  db.posts.newImagePost([imagePostId, imageCaption, imageURL])
  return res.status(200).send('okie dokie')
}

module.exports = {
  newPost,
  newImagePost,
}
