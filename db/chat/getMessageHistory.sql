select su.username as sending_username, ru.username as receiving_username, message
from messages m
inner join users su on su.uid = m.sendinguser
inner join users ru on ru.uid = m.recievinguser
where sendinguser = $1 AND recievinguser = $2 OR sendinguser = $2 AND recievinguser = $1;

-- select yi.item_name as your_item, ti.item_name as their_item, o.requesteditemid, o.fromuser_itemid, o.offer_id, u.username
-- from offers o
-- inner join items yi on yi.items_id = o.requesteditemid 
-- inner join items ti on ti.items_id = o.fromuser_itemid
-- inner join users u on u.user_id = o.fromuserid
-- where touserid = $1 AND offer_status = 1;