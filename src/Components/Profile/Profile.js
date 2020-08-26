import React, { Component } from 'react'
import axios from 'axios'
import Drop from '../Dropzone/DropZone';
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromUrl } from '../../spotifyFn';
import {getUser} from '../../Redux/musicReducer';
import {connect} from 'react-redux';



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
                        console.log(res)
                        this.setState({playlist: res.data})
                    })
                })
                .catch(error => console.log(error))
            })
        }

    }
    
    render() {
        const { user, playlist} = this.state
        // console.log(playlist)

            
            // console.log(playlist)

        return (
          <div>
              <Drop/>
        <h1>Hello {this.props.music.user.name} </h1>
        <h2>{this.props.music.user.email}</h2>
          </div>
          );
        }
    }
    const mapStateToProps = state => state

    export default connect(mapStateToProps,{getUser})(Profile)
    