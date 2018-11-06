
INSERT INTO images
  ( image_post_id, image_caption, image_url)
VALUES
  ($1, $2, $3)
RETURNING *;