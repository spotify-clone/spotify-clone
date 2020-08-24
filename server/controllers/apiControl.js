var Spotify = require('node-spotify-api');
var {client_id, client_secret } = process.env;

 // creating a new instatnce of the spotify function and passing it to
const spotify = new Spotify({
  id: client_id,
  secret: client_secret
}); 
 const scope = 'playlist-read-private'


module.exports = {

  getTracks: async(req,res)=>{

    await spotify.request('https://api.spotify.com/v1/tracks')

    // await Spotify({id: client_id, secret: client_secret}).request('wqfewqefwqfwqfwq')

    .then(function(data) {
      // console.log(data);

    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });


  },

  getUser: async(req,res)=>{
    
    const { id } = req.params

    let user = await spotify.request(`https://api.spotify.com/v1/users/${id}`)
                .then((data) => {
                  console.log(data)
                })
                .catch(function(err) {
                  console.error('Error occurred: ' + err); 
                });


    res.status(200).send(user)


  },
  getUserPlaylist: async(req,res)=>{


    await spotify.request(`https://api.spotify.com/v1/me/playlists`)
    .then(function(data) {
      
      res.status(200).send(data) 
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });


  },

  

  getPlaylist: async(req,res)=>{


    await spotify.request(`https://api.spotify.com/v1/browse/featured-playlists`)
    .then(function(data) {
      
      res.status(200).send(data.playlists.items) 
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


  },
  getArtist: async(req, res)=> {
    const id = 'req.params'
    await spotify.request(`https://api.spotify.com/v1/artists/${id}`)
    .then((data)=>{
      // console.log(data)
    })
    .catch((err)=>{
      console.error(`Error occurred:`+ err);
    })
  },

  getFeatures: async(req,res) =>{

    await spotify.request('https://api.spotify.com/v1/browse/categories')
    .then((data)=>{
      res.status(200).send(data.categories.items)
    })
    .catch((err)=>{
      console.error(`Error occurred:`+ err);
    })
  },

  getArtistTracks: async(req,res)=>{

    let newObj;

    const { id } = req.params
     console.log(id)

    //id = 93t2jfdig3g30g3g0ejgri33


    await spotify.request(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=SE`)
    .then(data => newObj = {...data})
    .catch((err)=>{
      console.error(`Error occurred:`+ err);
    })
    
    const { tracks } = newObj
    console.log(tracks)

    res.status(200).send(tracks)


    // for(var i=0; i < tracks.length; i++){      
    // if(tracks[i].preview_url !== null){
    //   console.log(tracks)
    //   res.status(200).send(tracks)

    // }};



  },
  getArtistAlbums: async(req,res)=>{

    let newObj;

    const { id } = req.params


    await spotify.request(`https://api.spotify.com/v1/artists/${id}/albums?include_groups=single%2Cappears_on&market=ES&limit=10&offset=5`)
    .then(data => {
      newObj = {...data}
      res.status(200).send(newObj.items)

    })
    
    .catch((err)=>{
      console.error(`Error occurred:`+ err);
    })
    
  
  },

  searchApi: async(req,res)=>{

    const value = req.query.search
    // console.log(value)
    // 1. req.body, req.query, req.params


    await spotify.request(`https://api.spotify.com/v1/search?q=${value}&type=artist&limit=1`)
    .then((data)=>{
      res.status(200).send(data.artists.items)
      
    })
    .catch((err)=>{
      console.error(`Error occurred:`+ err);
    })


  },

}
