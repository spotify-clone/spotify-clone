var Spotify = require('node-spotify-api');
var {client_id, client_secret } = process.env;

 
const spotify = new Spotify({
  id: client_id,
  secret: client_secret
});


module.exports = {
  getUser: async(req,res)=>{
    
    const { id } = req.params
    
      await spotify.request(`https://api.spotify.com/v1/users/${id}`)
          .then((data)=>{
            return res.status(200).send(data)
          })
          .catch(function(err) {
            console.error('Error occurred: ' + err); 
          });

  },

  getUserPlaylist: async(req,res)=>{
    const { id } = req.params


    await spotify.request(`https://api.spotify.com/v1/users/${id}/playlists`)
    .then((data)=>{
      // console.log(data.items)
      return res.status(200).send(data.items[0])
    })
    .catch(error => console.log(error))

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

  getNewReleases: async(req,res)=>{

    await spotify.request(`https://api.spotify.com/v1/browse/new-releases`)
    .then(function(data) {

      res.status(200).send(data.albums.items)
    })
    .catch(function(err) {
      console.error('Error occurred: ' + err); 
    });


  },
  // getArtist: async(req, res)=> {
  //   const id = 'req.params'
  //   await spotify.request(`https://api.spotify.com/v1/artists/${id}`)
  //   .then((data)=>{
  //     // console.log(data)
  //   })
  //   .catch((err)=>{
  //     console.error(`Error occurred:`+ err);
  //   })
  // },

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

    await spotify.request(`https://api.spotify.com/v1/artists/${id}/top-tracks?country=SE`)
    .then(data => newObj = {...data})
    .catch((err)=>{
      console.error(`Error occurred:`+ err);
    })
    
    const { tracks } = newObj


    res.status(200).send(tracks)

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


    await spotify.request(`https://api.spotify.com/v1/search?q=${value}&type=artist&limit=1`)
    .then((data)=>{
      res.status(200).send(data.artists.items)
      
    })
    .catch((err)=>{
      console.error(`Error occurred:`+ err);
    })


  },
  getTracksInPlaylist: async(req,res)=>{
    const { id } = req.params

    await spotify.request(`https://api.spotify.com/v1/playlists/${id}/tracks`)
    .then((data)=>{
      return res.status(200).send(data.items)
      
    })
    .catch((err)=>{
      console.error(`Error occurred:`+ err);
    })
  },

  deleteTrack: async(req,res)=>{

    const { id } = req.params

    // console.log(id)


    await spotify.request(`https://api.spotify.com/v1/playlists/${id}/tracks`)
    .then(()=>{
      console.log('success')
      
    })
    .catch((err)=>{
      console.error(`Error occurred:`+ err);
    })


  }

}
