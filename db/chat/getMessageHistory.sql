select su.username as sending_username, ru.username as receiving_username, ruid.uid as receiving_user_uid, message
from messages m
inner join users su on su.uid = m.sendinguser
inner join users ru on ru.uid = m.recievinguser
inner join users ruid on ruid.uid = m.recievinguser
where sendinguser = $1 AND recievinguser = $2 OR sendinguser = $2 AND recievinguser = $1;
