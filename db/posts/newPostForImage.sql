
INSERT INTO posts
  ( post_user_id,  post_title, post_time, post_body)
VALUES
  ( $1, $2,  CURRENT_TIMESTAMP, '' )
RETURNING *;