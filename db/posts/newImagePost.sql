
INSERT INTO images
  ( image_caption, image_url, image_post_id)
VALUES
  ($1, $2 , $3)
RETURNING *;