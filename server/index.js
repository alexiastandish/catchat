const express = require('express'),
  bodyParser = require('body-parser'),
  app = express(),
  port = 3005,
  massive = require('massive'),
  cookieParser = require('cookie-parser'),
  validator = require('express-validator'),
  session = require('express-session'),
  flash = require('flash'),
  passport = require('passport'),
  portIO = 8000,
  io = require('socket.io')()

io.on('connection', socket => {
  console.log('New client connected')

  socket.on('client send message', message => {
    console.log('save to the db ', message)
    io.sockets.emit('server send message', message)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

require('dotenv').config()

const { getCurrentUser, newUser } = require('./controllers/userCtrl')
const { getDashPosts, getDashImage } = require('./controllers/dashCtrl')
const { newPost, newImagePost } = require('./controllers/postCtrl')
const { getAllUsers, getChatHistory } = require('./controllers/chatCtrl')
// const { strategy, getUser } = require('./controllers/authCtrl')
// const LocalStrategy = require('passport-local').Strategy

massive(process.env.CONNECTION_STRING)
  .then(db => {
    app.set('db', db)
  })
  .catch(console.log)

app.use(bodyParser.json())
app.use(cookieParser())
app.use(validator())
app.use(
  session({
    secret: 'iliketurtles',
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000000,
    },
  })
)
app.use(flash())

app.use(passport.initialize())
app.use(passport.session())
// passport.use(strategy)

passport.serializeUser((user, done) => {
  const db = app.get('db')
  db.user
    .getUserAuth([user.uid])
    .then(response => {
      console.log(response)
      if (!response[0]) {
        console.log(response)
        db.user
          .addNewUser([user.uid, user.email, user.user_photo, user.username])
          .then(res => done(null, res[0]))
          .catch(console.log)
      } else return done(null, response[0])
    })
    .catch(console.log)
})

passport.deserializeUser((user, done) => {
  done(null, user)
})

// io.on('connection', socket => {
//   socket.emit('messageFromServer', { data: 'Welcome to the socketio server' })
//   socket.on('messageToServer', dataFromClient => {
//     console.log('dataFromClient', dataFromClient)
//   })
// })

// passport.use(
//   'local.signup',
//   new LocalStrategy(
//     {
//       usernameField: 'email',
//       passwordField: 'password',
//       passReqToCallback: true,
//     },
//     (req, email, password, done) => {

//     }
//   )
// )

// app.get('/api/currentUser', getUser)

// TODO: Setting up chat
// 1. Tables: messages BACKEND [DONE!]
// 2. Create backend endpoint for getting users BACKEND [DONE!]
// 3. Get those users FRONTEND [DONE!]
// 4. Select a user that you want to chat with FRONTEND
// (AXIOS) when you select a user it should get all of the messages between those two users and render on front end
// 5. Send a message to that user FRONTEND (with socketio) [DONE!]
// 6. Save message to the messages table (post endpoint) BACKEND
// 7. Emit that a message was sent BACKEND (with socketio) [DONE!]
// 8. Listen for messages being sent FRONTEND [DONE!]

// user endpoints
app.get(`/api/currentUser/:userId`, getCurrentUser)
app.post(`/api/currentUser/:userId`, newUser)

// dash endpoints
app.get('/api/dashboard', getDashPosts)
app.get(`/api/dashboardImage/:postId`, getDashImage)

// post endpoints
app.post(`/api/newPost`, newPost)
app.post(`/api/newImagePost`, newImagePost)

// chat endpoints
app.get('/api/getAllUsers', getAllUsers)
app.get('/api/messageHistory/:sendingUser/:receivingUser', getChatHistory)

io.listen(portIO)
console.log('listening on port ', portIO)

app.listen(port, () => {
  console.log('MARCO, POLO', port)
})

// npm i express cors body-parser massive dotenv
