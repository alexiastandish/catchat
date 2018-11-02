import React, { Component } from 'react'
import './Dash.scss'
import axios from 'axios'
import PostCard from '../../components/PostCard/PostCard'

class Dash extends Component {
  constructor(props) {
    super(props)
    this.state = {
      posts: [],
    }
  }

  componentDidMount() {
    axios.get('/api/dashboard').then(response => {
      console.log('response', response)
      this.setState({ posts: response.data })
    })
  }

  render() {
    console.log('this.state.posts', this.state.posts)
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
                    username={post.username}
                    userPhoto={post.user_photo}
                    postTitle={post.post_title}
                    postBody={post.post_body}
                    postTime={post.post_time}
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
