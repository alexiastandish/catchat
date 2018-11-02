import React, { Component } from 'react'
import './Dash.scss'

class Dash extends Component {
  constructor(props) {
    super(props)
    this.state = {}
  }
  render() {
    return (
      <div className="Dash--container">
        <h1>Dash</h1>
        <div className="Dash--posts">
          <ul>
            <li>post1</li>
            <li>post2</li>
            <li>post3</li>
          </ul>
        </div>
      </div>
    )
  }
}
export default Dash
