SELECT uid, user_photo, username
FROM users
WHERE uid <> $1;