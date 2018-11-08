const getAllUsers = (req, res) => {
  const db = req.app.get('db')
  db.chat
    .getUsers([req.params.userId])
    .then(response => {
      res.status(200).json(response)
    })
    .catch(err => console.log('err', err))
}

const getChatHistory = (req, res) => {
  const db = req.app.get('db')
  db.chat
    .getMessageHistory([req.params.sendingUser, req.params.receivingUser])
    .then(response => {
      return res.status(200).json(response)
    })
    .catch(err => console.log('err', err))
}

const postMessage = (req, res) => {
  const db = req.app.get('db')
  db.chat
    .postNewMessage([req.body.sendingUser, req.body.receivingUser, req.body.message])
    .then(response => {
      // console.log('responseMESSAGE', response)
      return res.status(200).json(response)
    })
    .catch(err => console.log('err', err))
}

module.exports = {
  getAllUsers,
  getChatHistory,
  postMessage,
}
