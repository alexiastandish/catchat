INSERT INTO messages (sendinguser, recievinguser, message)
VALUES ($1, $2, $3)

RETURNING *;