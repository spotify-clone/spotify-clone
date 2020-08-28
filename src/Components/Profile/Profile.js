import React, { Component } from 'react'
import axios from 'axios'
import Drop from '../Dropzone/DropZone';
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromUrl } from '../../spotifyFn';
import {getUser} from '../../Redux/musicReducer';
import {connect} from 'react-redux';
import '../Profile/profile.scss'
import { Button } from 'semantic-ui-react'



const spotify = new SpotifyWebApi();

class Profile extends Component {
    constructor(props){
        super(props)

        this.state={
            user: [],
            playlist: [],
            tracks: [],
            song:''
        }

    };
 

    componentDidMount = () =>{

        //get token from url and sending it to spotify to verify authorization

        //wwww.website.com/access_token=03g2g23gg03ijgi2kfll
        const hash = getTokenFromUrl()

        //_token = 03g2g23gg03ijgi2kfll
        const _token = Object.values(hash)[0].toString('')

        if(_token){
            spotify.setAccessToken(_token);
    
            spotify.getMe().then((user)=>{

                // if(this.props.music.user === null){
                //     getUser(user)

                // }

                axios.get(`/api/user/${user.id}`)
                .then(res=>{
                    this.setState({user: res.data})
                    axios.get(`/api/user-playlist/${user.id}`)
                    .then(res=>{
                        this.setState({playlist: res.data})

                        const id = '20LB4gwYaQmZ9UkZyYCuI5'
                        axios.get(`/api/playlist-tracks/${id}`)
                        .then(res =>{
                            this.setState({tracks: res.data})
                        })
                    })
                })
                .catch(error => console.log(error))
            })
        }
        else{
            this.setState({user: this.props.music.user})
        }
    }


    updateName =(name) =>{

        axios.put(`/api/local/${this.props.music.user.account_id}`, {name})
        .then(() =>{
            axios.get(`/api/user-account/${this.props.music.user.account_id}`)
            .then(res =>{
                this.props.getUser(res.data[0])
            })
        })
        .catch(err=>console.log(err))
    
    }



    
    render() {
        const { user, playlist, tracks} = this.state
        // console.log(user)
        // console.log(tracks)
        // console.log(playlist)
        const mappedTracks = tracks.map((element,index)=>{
            let audio;
        
            //condition to filter out any null or undefined values --> not working for some reason
            if(element.track.preview_url !== null || element.track.preview_url !== undefined){
                audio = element.track.preview_url
            }
    
    
            //buttons to control which track to play
            return <div className='trackList'key={index}>
                 <Button icon='pause' content='Pause' onClick={() => this.setState({song: ''})}/><div><p>{element.track.name}</p></div>
                <Button  icon='play' content='Play' onClick={() => this.setState({song:audio})}/><div><p>{element.track.name}</p></div>
            </div>
        })

        return (
            
              //main-div
          <div className='mainDiv'> 


        {(!user.display_name ?
        <div id='backend'>
        <Drop updateName={this.updateName} />
        <div id="bio">
        <h6>Hello {this.props.music.user.name} </h6>
        <img className='profile-pic' src={this.props.music.user.pic} alt='your pic here' ></img>
        <h2>{this.props.music.user.email}</h2>
        </div>
        </div>
        
        :

        <div>
        <Drop/>
        <div className='playlist'>

        <h2>Hello {user.display_name} </h2>
        <h2>{playlist.name}</h2>
        <div className='track-box'>
        {mappedTracks}
        </div>

        </div>
            
        </div>


        )}
          </div> //main-bottom-div
          
          );
        }
    }
    const mapStateToProps = state => state

    export default connect(mapStateToProps,{getUser})(Profile)
    