
INSERT INTO posts
  ( post_user_id,  post_title, post_time)
VALUES
  ( $1, $2,  CURRENT_TIMESTAMP )
RETURNING *;