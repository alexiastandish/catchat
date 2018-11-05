const getDashPosts = (req, res) => {
  const db = req.app.get('db')
  db.dash.getDashPosts().then(response => {
    console.log('response', response)
    return res.status(200).json(response)
  })
}

const getDashImage = (req, res) => {
  const { postId } = req.params
  const db = req.app.get('db')
  db.dash.getImageForPost(postId).then(response => {
    console.log('response', response)
    return res.status(200).json(response)
  })
}

module.exports = {
  getDashPosts,
  getDashImage,
}
