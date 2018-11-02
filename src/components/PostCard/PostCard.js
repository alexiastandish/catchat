import React from 'react'
import './PostCard.scss'

const PostCard = props => {
  return (
    <div className="PostCard--container">
      <div className="PostCard--header">
        <div className="right--header">
          <img src={props.userPhoto} alt="user-post" />
          <h5>{props.username}</h5>
        </div>
        <p>{props.postTime}</p>
      </div>

      <div className="PostCard--body">
        <h3>{props.postTitle}</h3>
        <p>{props.postBody}</p>
      </div>
    </div>
  )
}
export default PostCard
