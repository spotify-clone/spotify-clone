update mp3_tracks
set count = (select count + 1 from mp3_tracks where mp3_track_id = $1)
where mp3_track_id = $1

 returning *;
