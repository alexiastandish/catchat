import React, { Component } from 'react'
import './Post.scss'
import { Link, Switch, Route } from 'react-router-dom'
import ImagePost from './ImagePost'
import PostPost from './PostPost'
import axios from 'axios'

class Post extends Component {
  constructor(props) {
    super(props)
    // this.state = { user: {} }

    this.addToPosts = this.addToPosts.bind(this)
    // this.addToImages = this.addToImages.bind(this)
  }

  addToPosts(postSubject, postBody) {
    axios.post('/api/newPost', {
      userId: this.props.user.uid,
      postSubject,
      postBody,
    })
  }

  render() {
    console.log('this.props', this.props)
    console.log('this.state', this.state)
    return (
      <div className="Post--container">
        <div className="Post--section--header">
          <h3>New Post</h3>
          <div className="Post--links">
            <Link to="/post/post">Post</Link> {' / '} <Link to="/post/image">Image</Link>
          </div>
        </div>
        <Switch>
          <Route
            path="/post/image"
            component={ImagePost}
            addToPosts={this.addToPosts}
            addToImages={this.addToImages}
          />
          <Route
            path="/post/post"
            render={() => <PostPost userId={this.props.user.uid} addToPosts={this.addToPosts} />}
          />
        </Switch>
      </div>
    )
  }
}

export default Post
