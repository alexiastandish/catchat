import React, { Component } from 'react'
//import './ImagePost.css';

class ImagePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postTitle: '',
      imageURL: '',
      imageCaption: '',
    }
  }
  render() {
    return (
      <div className="">
        <h1>ImagePost</h1>
      </div>
    )
  }
}
export default ImagePost
