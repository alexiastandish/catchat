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

  socket.on('change color', color => {
    console.log('Color Changed to: ', color)
    io.sockets.emit('change color', color)
  })

  socket.on('disconnect', () => {
    console.log('user disconnected')
  })
})

require('dotenv').config()

const { getCurrentUser, newUser } = require('./controllers/userCtrl')
const { getDashPosts, getDashImage } = require('./controllers/dashCtrl')
const { newPost, newImagePost } = require('./controllers/postCtrl')
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
app.get(`/api/currentUser/:userId`, getCurrentUser)
app.post(`/api/currentUser/:userId`, newUser)
app.get('/api/dashboard', getDashPosts)
app.get(`/api/dashboardImage/:postId`, getDashImage)

app.post(`/api/newPost`, newPost)
app.post(`/api/newImagePost`, newImagePost)

io.listen(portIO)
console.log('listening on port ', portIO)

app.listen(port, () => {
  console.log('MARCO, POLO', port)
})

// npm i express cors body-parser massive dotenv
