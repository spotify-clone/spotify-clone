export const authEndpoint = "https://accounts.spotify.com/authorize";
// Replace with your app's client ID, redirect URI and desired scopes
const clientId = 'd6e4efa4cad54f1d8498c54e41953c30'
// const redirectUri = "http://64.227.104.65:3333/profile";
const redirectUri = "http://localhost:3333/profile";

const scopes = [
  "user-read-currently-playing",
  "user-read-recently-played",
  "user-read-playback-state",
  "user-top-read",
  "user-modify-playback-state",
  "playlist-read-private",
  "playlist-modify-public",
  "playlist-modify-private"
];

export const getTokenFromUrl = () => {
    
  return window.location.hash.substring(1).split("&").reduce((initial, item) => {
      var parts = item.split("=");
      initial[parts[0]] = decodeURIComponent(parts[1]);


      return initial;
    }, {});
};

export const accessUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  "%20"
)}&response_type=token&show_dialog=true`;