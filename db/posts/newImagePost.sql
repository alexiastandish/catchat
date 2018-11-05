
INSERT INTO images
  ( image_caption, image_url)
VALUES
  ( $1 , $2)
RETURNING *;