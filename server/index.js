const express = require('express'),
  bodyParser = require('body-parser'),
  port = 3005,
  app = express(),
  massive = require('massive')
require('dotenv').config()
const { getCurrentUser, newUser } = require('./controllers/userCtrl')
const { getDashPosts } = require('./controllers/dashCtrl')
const { newPost } = require('./controllers/postCtrl')

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db)
  })
  .catch(console.log)

app.use(bodyParser.json())

app.get(`/api/currentUser/:userId`, getCurrentUser)
app.post(`/api/currentUser/:userId`, newUser)
app.get('/api/dashboard', getDashPosts)

app.post(`/api/newPost`, newPost)
// app.post(`/api/newImagePost`, newImagePost)

app.listen(port, () => {
  console.log('MARCO, POLO', port)
})

// npm i express cors body-parser massive dotenv
