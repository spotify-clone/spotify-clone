var Spotify = require('node-spotify-api');
var {client_id, client_secret } = process.env;
 
const spotify = new Spotify({
  id: client_id,
  secret: client_secret
});
 


module.exports = {

  getTracks: async(req,res)=>{

    await spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')
    .then(function(data) {
      console.log(data); 
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });


  },

  getUser: async(req,res)=>{

    await spotify.request(`https://api.spotify.com/v1/users/tplch23cw47fimii6dmzmv1yg`)
    .then(function(data) {
      console.log(data); 
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });


  },

  getPlaylist: async(req,res)=>{


    await spotify.request(`https://api.spotify.com/v1/users/tplch23cw47fimii6dmzmv1yg/playlists`)
    .then(function(data) {
      console.log(data); 
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });


  },

  getEpisode: async(req,res)=>{

    await spotify.request(`https://api.spotify.com/v1/episodes`)
    .then(function(data) {
      console.log(data); 
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });



  }





}
