update mp3_tracks
set count = (select count + 1 from mp3_tracks where user_id = $1)
where user_id = $1

 returning *;
