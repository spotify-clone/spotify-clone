var Spotify = require('node-spotify-api');
var {client_id, client_secret } = process.env;
 
//creating a new instance of Spotify function and passing it an object of the client_id and client_secret
const spotify = new Spotify({
  id: client_id,
  secret: client_secret
});
 


module.exports = {

  getTracks: async(req,res)=>{

    await spotify.request('https://api.spotify.com/v1/tracks/7yCPwWs66K8Ba5lFuU2bcx')

    // await Spotify({id: client_id, secret: client_secret}).request('wqfewqefwqfwqfwq')

    .then(function(data) {
      console.log(data.display_name);

    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });


  },

  getUser: async(req,res)=>{

    let user = await spotify.request(`https://api.spotify.com/v1/users/tplch23cw47fimii6dmzmv1yg`)
                .then((data) => {
                  return data
                })
                .catch(function(err) {
                  console.error('Error occurred: ' + err); 
                });


    res.status(200).send(user)


  },

  getPlaylist: async(req,res)=>{


    await spotify.request(`https://api.spotify.com/v1/browse/featured-playlists`)
    .then(function(data) {
      console.log(data.playlists.items); 
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });


  },

  getAlbums: async(req,res)=>{

    await spotify.request(`https://api.spotify.com/v1/browse/new-releases`)
    .then(function(data) {

      res.status(200).send(data.albums.items)
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });


  }





}
