import React, { Component } from 'react'
//import './PostPost.css';

class PostPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postTitle: '',
      postBody: '',
    }
  }
  render() {
    return (
      <div className="Post">
        <h1>PostPost</h1>
      </div>
    )
  }
}
export default PostPost
