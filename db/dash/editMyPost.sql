UPDATE posts
SET post_title=$2, post_body=$3
WHERE post_id = $1

RETURNING*;