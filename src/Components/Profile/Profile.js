import React, { Component } from 'react'
import axios from 'axios'
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromUrl } from '../../spotifyFn';

const spotify = new SpotifyWebApi();

class Profile extends Component {
    constructor(props){
        super(props)

        this.state={
            user: [],
            playlist: []
        }

    };
 

    componentDidMount = () =>{

        //get token from url and sending it to spotify to verify authorization
        const hash = getTokenFromUrl()
        const _token = Object.values(hash)[0].toString('')

        if(_token){
            spotify.setAccessToken(_token);
    
            spotify.getMe().then((user)=>{
                axios.get(`/api/user/${user.id}`)
                .then(res=>{
                    this.setState({user: res.data})
                    axios.get(`/api/user-playlist/${user.id}`)
                    .then(res=>{
                        this.setState({playlist: res.data})
                    })
                })
                .catch(error => console.log(error))
            })
        }

    }


        render() {
            const { user, playlist} = this.state

            // console.log(user)
            // console.log(playlist)

        return (
          <div>
              <h1>Sptoify Picture</h1>
              <h2>Spotify Name</h2>
          </div>
          );
        }
    }

    export default Profile;