const getAllUsers = (req, res) => {
  const db = req.app.get('db')
  db.chat
    .getUsers()
    .then(response => {
      console.log('response', response)
      res.status(200).json(response)
    })
    .catch(err => console.log('err', err))
}

const getChatHistory = (req, res) => {
  console.log('req.params', req.params)
  const db = req.app.get('db')
  db.chat
    .getMessageHistory([req.params.sendingUser, req.params.receivingUser])
    .then(response => {
      console.log('response', response)
      return res.status(200).json(response)
    })
    .catch(err => console.log('err', err))
}

module.exports = {
  getAllUsers,
  getChatHistory,
}
