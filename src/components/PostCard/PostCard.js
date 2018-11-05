import React, { Component } from 'react'
import './PostCard.scss'
import axios from 'axios'

class PostCard extends Component {
  constructor(props) {
    super(props)
    this.state = { imageCaption: '', imageURL: '' }

    this.getImageCaptionAndImageURL = this.getImageCaptionAndImageURL.bind(this)
  }

  componentDidMount() {
    this.getImageCaptionAndImageURL(this.props.postId)
  }

  getImageCaptionAndImageURL() {
    axios.get(`/api/dashboardImage/${this.props.postId}`).then(response => {
      console.log('response', response)
      this.setState({
        imageCaption: response.data[0] && response.data[0].image_caption,
        imageURL: response.data[0] && response.data[0].image_url,
      })
    })
  }
  render() {
    console.log('this.state', this.state)
    const { imageCaption, imageURL } = this.state
    return (
      <div className="PostCard--container">
        <div className="PostCard--header">
          <div className="right--header">
            <img src={this.props.userPhoto} alt="user-post" />
            <h5>{this.props.username}</h5>
          </div>
          <p>{this.props.postTime}</p>
        </div>

        <div className="PostCard--body">
          {imageURL === '' ? (
            <div className="post">
              <h3>{this.props.postTitle}</h3>
              <p>{this.props.postBody}</p>
            </div>
          ) : (
            <div className="image-post">
              <h3>{this.props.postTitle}</h3>
              <p>{imageCaption}</p>
              <div>
                <img src={imageURL} />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default PostCard
