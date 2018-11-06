import React, { Component } from 'react'
import './ImagePost.scss'
import FileInput from 'react-simple-file-input'
import { storage } from '../../firebase'

class ImagePost extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postSubject: '',
      imageURL: '',
      imageCaption: '',
      // mood: '',
    }
    this.storageRef = storage.ref('/dash').child('dash-images')

    // this.handlePostSubmit = this.handlePostSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleImageSelect = this.handleImageSelect.bind(this)
    this.addImageURL = this.addImageURL.bind(this)
    this.handleImagePostSubmit = this.handleImagePostSubmit.bind(this)
  }

  handleImageSelect(file) {
    this.storageRef
      .child(file.name)
      .put(file, { contentType: file.type })
      .then(snapshot => {
        console.log('snapshot', snapshot)
        this.storageRef
          .child(snapshot.metadata.name)
          .getDownloadURL()
          .then(this.addImageURL)
      })
  }

  addImageURL(imageURL) {
    this.setState({ imageURL })
  }

  // handlePostSubmit() {
  //   const { postSubject } = this.state
  //   this.props.addToPosts({ postSubject })
  // }

  handleImagePostSubmit() {
    const { postSubject, imageURL, imageCaption } = this.state
    this.props.addToImages(postSubject, imageURL, imageCaption)
  }

  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value })
  }

  render() {
    console.log('this.state', this.state)
    return (
      <div className="ImagePost">
        <div className="ImagePost--image--section--width">
          <form onSubmit={this.handleImagePostSubmit}>
            <div className="kitten-gif">
              <img
                src="https://66.media.tumblr.com/0a2311d3207417c7d9ada76b9e1428d8/tumblr_os3wh3bB801uypfuuo1_400.gif"
                alt="kitten-dance"
              />
            </div>
            <label>Subject:</label>
            <textarea type="text" name="postSubject" onChange={this.handleChange} />

            <label>Caption:</label>
            <textarea
              type="text"
              name="imageCaption"
              className="image-caption"
              onChange={this.handleChange}
            />
            <div className="firebase-image-input">
              <FileInput className="firebase-input" onChange={this.handleImageSelect} />
            </div>

            {/* <option value="happy" className="" /> */}

            <input type="submit" value="Submit" className="form-button" />
          </form>
        </div>
      </div>
    )
  }
}
export default ImagePost
