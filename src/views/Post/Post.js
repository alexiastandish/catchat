import React, { Component } from 'react'
import './Post.scss'
import { Link, Switch, Route } from 'react-router-dom'
import ImagePost from './ImagePost'
import PostPost from './PostPost'

class Post extends Component {
  constructor(props) {
    super(props)
    this.state = {
      postTitle: '',
      postBody: '',
    }
  }
  render() {
    return (
      <div className="Post--container">
        <div className="Post--section--header">
          <h3>New Post</h3>
          <div className="Post--links">
            <Link to="/post/post">Post</Link> {' / '} <Link to="/post/image">Image</Link>
          </div>
        </div>
        <Switch>
          <Route path="/post/image" component={ImagePost} />
          <Route path="/post/post" component={PostPost} />
        </Switch>
      </div>
    )
  }
}
export default Post
