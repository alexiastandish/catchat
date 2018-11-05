
INSERT INTO posts
  ( post_user_id,  post_title, post_body, post_time)
VALUES
  ( $1, $2, $3, CURRENT_TIMESTAMP )
RETURNING *;