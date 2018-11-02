const getDashPosts = (req, res) => {
  const db = req.app.get('db')
  db.dash.getDashPosts().then(response => {
    console.log('response', response)
    return res.status(200).json(response)
  })
}

module.exports = {
  getDashPosts,
}
