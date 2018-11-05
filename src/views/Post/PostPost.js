import React, { Component } from 'react'
import './PostPost.scss'

class PostPost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postSubject: '',
      postBody: '',
      // mood: '',
    }
    this.handlePostSubmit = this.handlePostSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
  }

  handlePostSubmit() {
    const { postSubject, postBody } = this.state
    console.log('postSubject', postSubject)
    console.log('postBody', postBody)
    this.props.addToPosts(postSubject, postBody)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    console.log('this.state', this.state)
    console.log('this.props', this.props)
    return (
      <div className="Post">
        <div className="Post--post--section--width">
          <form onSubmit={this.handlePostSubmit}>
            <div className="kitten-gif">
              <img src="https://mbtskoudsalg.com/images/cat-gif-png-3.gif" alt="kitten-dance" />
            </div>
            <label>Subject:</label>
            <textarea type="text" name="postSubject" onChange={this.handleChange} />
            <label>Body:</label>
            <textarea
              type="text"
              name="postBody"
              className="body-input"
              onChange={this.handleChange}
            />
            {/* <option value="happy" className="" /> */}

            <input type="submit" value="Submit" className="form-button" />
          </form>
        </div>
      </div>
    )
  }
}
export default PostPost
