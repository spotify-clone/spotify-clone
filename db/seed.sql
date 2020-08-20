CREATE TABLE local_account(
    account_id SERIAL PRIMARY KEY,
    email VARCHAR(200),
    password TEXT,
    name VARCHAR(200),
    pic VARCHAR(200)

);


CREATE TABLE playlist(
    playlist_id SERIAL PRIMARY KEY,
    playlist_name VARCHAR(200),
    genre VARCHAR(200),
    account_id INT,
    user_id INT references local_account(account_id)
);


CREATE TABLE favorite_songs(
    song_id SERIAL PRIMARY KEY,
    song_name VARCHAR(200),
    artist VARCHAR(200),
    album_title VARCHAR(200),
    genre VARCHAR(200),
    user_id INT references local_account(account_id)

);

CREATE TABLE chat_history(
    chat_id SERIAL PRIMARY KEY,
    history VARCHAR(500),
    user_id INT references local_account(account_id)
    
);


CREATE TABLE mp3_tracks(
    mp3_track_id SERIAL PRIMARY KEY,
    name VARCHAR(200),
    track VARCHAR(200),
    user_id INT references local_account(account_id),
    count int default(0)

);