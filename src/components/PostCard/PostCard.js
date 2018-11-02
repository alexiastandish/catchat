import React from 'react'
//import './.css';

const PostCard = props => {
  return (
    <div className="PostCard--container">
      <div className="PostCard--header">
        <img src={props.userPhoto} alt="user-post" />
        <h5>{props.username}</h5>
        <p>{props.postTime}</p>
      </div>
    </div>
  )
}
export default PostCard
