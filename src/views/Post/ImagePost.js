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
      isUploadingImage: false,
      // mood: '',
    }
    this.storageRef = storage.ref('/dash').child('dash-images')

    // this.handlePostSubmit = this.handlePostSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleImageSelect = this.handleImageSelect.bind(this)
    this.addImageURL = this.addImageURL.bind(this)
    this.handleImagePostSubmit = this.handleImagePostSubmit.bind(this)
    this.uploadImage = this.uploadImage.bind(this)
  }

  handleImageSelect(file) {
    this.setState({ isUploadingImage: true }, () => this.uploadImage(file))
  }

  uploadImage(file) {
    return this.storageRef
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
    this.setState({ isUploadingImage: false, imageURL })
  }

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
            <div className="image-input">
              <FileInput className="image-upload-input" onChange={this.handleImageSelect} />
            </div>

            {this.state.imageURL !== '' && (
              <div className="image-uploaded">
                <img src={this.state.imageURL} alt="upload" />
              </div>
            )}

            {/* <option value="happy" className="" /> */}

            <button disabled={this.state.isUploadingImage} type="submit" className="form-button">
              Submit
            </button>
          </form>
        </div>
      </div>
    )
  }
}
export default ImagePost
