import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
import axios from 'axios'

const ENDPOINT = 'localhost:8000'

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      activeMessage: '',
      messages: [],
      listOfUsers: [],
      receivingUser: null,
    }

    this.socket = socketIOClient(ENDPOINT)
    this.getAllUsers = this.getAllUsers.bind(this)
    this.getMessageHistory = this.getMessageHistory.bind(this)
  }

  componentDidMount() {
    this.socket.on('server send message', message => {
      this.setState({ messages: [...this.state.messages, message] })
    })
    // console.log('this.props', this.props)
    this.getAllUsers()
  }

  getAllUsers() {
    axios.get(`/api/getAllUsers/${this.props.user.uid}`).then(response => {
      this.setState({ listOfUsers: response.data })
    })
  }
  // TODO: componentWillUnmount(){
  //   // clean up once user leaves page
  // }

  sendMessage() {
    console.log('sending')
    this.socket
      .emit('client send message', {
        message: this.state.activeMessage,
        receivingUser: this.state.receivingUser,
        sendingUser: this.props.user.uid,
      })
      .then(() => {
        this.setState({ activeMessage: '' })
      })
  }

  getMessageHistory() {
    axios
      .get(`/api/messageHistory/${this.props.user.uid}/${this.state.receivingUser}`)
      .then(response => {
        // console.log('response', response)
        this.setState({ messages: response.data })
      })
  }

  handleUserSelection(uid) {
    console.log('uid', uid)
    this.setState({ receivingUser: uid }, this.getMessageHistory)
  }

  handleSubmit(event) {
    event.preventDefault()
  }

  render() {
    // console.log('this.state.receivingUser', this.state.receivingUser)
    // console.log('this.state.messages', this.state.messages)
    // console.log('this.props', this.props)
    // console.log('this.state.listOfUsers', this.state.listOfUsers)

    return (
      <div className="Chat--conatiner">
        <section className="user--list">
          {this.state.listOfUsers &&
            this.state.listOfUsers.map(user => {
              return (
                <div key={user.uid}>
                  <button onClick={() => this.handleUserSelection(user.uid)}>
                    {user.username}
                  </button>
                </div>
              )
            })}
        </section>
        {this.state.messages.map((message, index) => (
          <div className="chat--container" key={index}>
            {message.receiving_user_uid === this.state.receivingUser && (
              <div style={{ fontSize: '14px', color: 'red' }}>
                {message.receiving_username}
                <p>{message.message}</p>
              </div>
            )}
            <div style={{ fontSize: '14px', color: 'blue' }}>
              {message.sending_username}
              <p>{message.message}</p>
            </div>
          </div>
        ))}
        <form onSubmit={this.handleSubmit}>
          <input
            onChange={e => {
              this.setState({ activeMessage: e.target.value })
            }}
            value={this.state.activeMessage}
            type="text"
          />

          <button
            type="submit"
            onClick={() => {
              console.log('sending')
              const message = {
                message: this.state.activeMessage,
                receivingUser: this.state.receivingUser,
                sendingUser: this.props.user.uid,
              }

              axios.post('/api/postMessage', message).then(() => {
                Promise.resolve(this.socket.emit('client send message', message)).then(() => {
                  this.setState({ activeMessage: '' })
                })
              })
            }}
          >
            Post message
          </button>
        </form>
        {/* <button onClick={this.sendMessage}>Post message</button> */}
      </div>
    )
  }
}
export default Chat
