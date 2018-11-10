import React, { Component } from 'react'
import './PostCard.scss'
import axios from 'axios'

class PostCard extends Component {
  constructor(props) {
    super(props)
    this.state = {
      imageCaption: '',
      imageURL: '',
      show: false,
      postTitle: '',
      postBody: '',
    }

    this.getImageCaptionAndImageURL = this.getImageCaptionAndImageURL.bind(this)
    // this.handleSubmit = this.handleSubmit.bind(this)
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

  // handleSubmit(event) {
  //   console.log('event')
  //   axios
  //     .put(`/api/editPost/${this.props.postId}`, {
  //       postId: this.props.postId,
  //       postSubject: this.state.postTitle,
  //       postBody: this.state.postBody,
  //     })
  //     .then(event.preventDefault())
  // }

  render() {
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
        {this.state.show ? (
          <div className="PostCard--body">
            <div>
              <input
                onChange={e => {
                  this.setState({ postTitle: e.target.value })
                }}
              />
              <input
                onChange={e => {
                  this.setState({ postBody: e.target.value })
                }}
              />
              <button
                onClick={() => {
                  this.props.editPost({
                    postId: this.props.postId,
                    postTitle: this.state.postTitle,
                    postBody: this.state.postBody,
                  })
                }}
              />
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
        ) : (
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
        )}

        <div className="editable--buttons">
          {this.props.currentUser === this.props.uid && (
            <button
              onClick={() => {
                this.props && this.props.deletePost(this.props.postId)
              }}
            >
              Delete My Post
            </button>
          )}

          <button
            onClick={() => {
              this.setState(prevState => ({ show: !prevState.show }))
            }}
          >
            Edit My Post
          </button>
        </div>
      </div>
    )
  }
}
export default PostCard
