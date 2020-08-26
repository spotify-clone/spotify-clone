update mp3_tracks
set count = $2
where mp3_track_id = $1;