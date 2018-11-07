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
      // console.log('response', response)
      this.setState({
        imageCaption: response.data[0] && response.data[0].image_caption,
        imageURL: response.data[0] && response.data[0].image_url,
      })
    })
  }
  render() {
    // console.log('this.state', this.state)
    // console.log('this.props', this.props)
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
          <div>
            <h3>{this.props.postTitle}</h3>
            <p>{this.props.postBody}</p>
          </div>
          {imageURL !== '' && (
            <div className="image-post">
              <p>{imageCaption}</p>
              <div>
                <img src={imageURL} alt={imageURL} />
              </div>
            </div>
          )}
        </div>
      </div>
    )
  }
}
export default PostCard
