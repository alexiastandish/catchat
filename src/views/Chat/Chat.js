import React, { Component } from 'react'
import socketIOClient from 'socket.io-client'
// import io from 'socket.io-client'

class Chat extends Component {
  constructor(props) {
    super(props)

    this.state = {
      endpoint: 'localhost:8000', // this is where we are connecting to with sockets
      color: 'white',
    }
    // this.send = this.send.bind(this)
  }

  send = () => {
    const socket = socketIOClient(this.state.endpoint)
    socket.emit('change color', this.state.color) // change 'red' to this.state.color
  }

  setColor = color => {
    this.setState({ color })
  }

  render() {
    console.log('this.state', this.state)
    const socket = socketIOClient(this.state.endpoint)
    socket.on('change color', color => {
      document.body.style.backgroundColor = color
    })
    return (
      <div style={{ textAlign: 'center' }}>
        <button onClick={() => this.send()}>Change Color</button>
        <button id="blue" onClick={() => this.setColor('blue')}>
          Blue
        </button>
        <button id="red" onClick={() => this.setColor('red')}>
          Red
        </button>
      </div>
    )
  }
}
export default Chat
