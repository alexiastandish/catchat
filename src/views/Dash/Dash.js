import React, { Component } from 'react'
import './Dash.scss'
import axios from 'axios'
import PostCard from '../../components/PostCard/PostCard'

class Dash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
      currentUser: '',
    }
    this.deletePost = this.deletePost.bind(this)
    this.editPost = this.editPost.bind(this)
  }

  componentDidMount() {
    axios.get('/api/dashboard').then(response => {
      this.setState({ posts: response.data })
    })
  }

  deletePost(postId) {
    axios.delete(`/api/removePost/${postId}`)
  }

  editPost({ postId, postTitle, postBody }) {
    console.log('postId, postTitle, postBody', postId, postTitle, postBody)
    axios.put(`/api/editPost/${postId}`, {
      postTitle,
      postBody,
    })
  }

  render() {
    console.log('this.props', this.props)
    console.log('this.state', this.state)
    return (
      <div className="Dash--container">
        <div className="Dash--section--width">
          <div className="Dash--menubar">
            <h3>Kitten Krazy</h3>
            <div>
              Search: <input />
            </div>
          </div>

          <div className="Dash--posts">
            {this.state.posts.map((post, index) => {
              console.log('post', post)
              return (
                <div key={index}>
                  <PostCard
                    uid={post.uid}
                    username={post.username}
                    userPhoto={post.user_photo}
                    postTitle={post.post_title}
                    postBody={post.post_body}
                    postTime={post.post_time}
                    postId={post.post_id}
                    currentUser={this.props.user && this.props.user.uid}
                    deletePost={this.deletePost}
                    editPost={this.editPost}
                  />
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
}
export default Dash
