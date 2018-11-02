select p.post_time, p.post_title, p.post_body, 
u.user_photo, u.username
-- c.comment_time, c.comment_body
-- im.image_caption, im.image_url
from posts p
join users u on u.uid = p.post_user_id 
-- join comments c on c.comment_post_id = p.post_id
-- join images im on im.image_post_id = p.post_id
ORDER BY p.post_time DESC;