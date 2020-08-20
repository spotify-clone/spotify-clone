update mp3_track
set count = (select count + 1 from mp3_track where mp3_track_id = $2)
where mp3_track_id = $2

 returning *;
