const getDashPosts = (req, res) => {
  const db = req.app.get('db')
  db.dash.getDashPosts().then(response => {
    // console.log('response', response)
    return res.status(200).json(response)
  })
}

const getDashImage = (req, res) => {
  const { postId } = req.params
  const db = req.app.get('db')
  db.dash.getImageForPost(postId).then(response => {
    // console.log('response', response)
    return res.status(200).json(response)
  })
}

const removePost = (req, res) => {
  console.log('req.params', req.params)
  const db = req.app.get('db')
  db.dash
    .deletePost([req.params.postId])
    .then(() => {
      return res.status(200).json('deleted')
    })
    .catch(err => console.log('err', err))
}

module.exports = {
  getDashPosts,
  getDashImage,
  removePost,
}
