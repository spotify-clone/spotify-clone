

CREATE TABLE mp3_tracks(
    mp3_track_id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    track VARCHAR(200),
    -- user_id INT references local_account(account_id)

);