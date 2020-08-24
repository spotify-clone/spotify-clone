import React, { Component } from 'react'
import MyCarousel from './../Carousel/Carousel'
import MyCarousel1 from './../Carousel/Carousel1'
import MyCarousel2 from './../Carousel/Carousel2'
import axios from 'axios'
import SpotifyWebApi from "spotify-web-api-js";
import { getTokenFromUrl } from '../../spotifyFn';
import {accessUrl} from '../../spotifyFn'

const spotify = new SpotifyWebApi();


class Dash extends Component {
    constructor(props){
        super(props)

        this.state = {
            list: [],
            featuresList: [],
            playlist: []

        }

    };


    componentDidMount = () =>{
        this.getAlbums()
        this.getPlaylist()
        this.getFeatures()

        //get token from url and sending it to spotify to verify authorization
        const hash = getTokenFromUrl()
        const _token = Object.values(hash)[0].toString('')

        if(_token){
          spotify.setAccessToken(_token);
    
          spotify.getMe().then((user)=>{
              axios.get(`/api/user/${user.id}`)
              .then(()=> console.log('success'))
              .catch(error => console.log(error))
          })
        }

    }

    getFeatures = () =>{
        axios.get('/api/features')
        .then(res =>{
            this.setState({featuresList: res.data})
        })
        .catch(error => console.log(error))

    }

    getPlaylist = () =>{
        axios.get('/api/playlist')
        .then(res=>{
                this.setState({playlist: res.data})

        })
        .catch(error => console.log(error))


    }


    getAlbums = () =>{
        axios.get('/api/albums')
        .then((res)=>{
            this.setState({list:res.data})

        })
        .catch(error =>{console.log(error)})
    }


    render() {
        const { list, playlist, featuresList } = this.state

        // const mapped = list.map(element=>{
        //     return <img src={element.images[2].url}/>
        // })
  

        const mappedFeatures = featuresList.map((element,index)=>{
            return <img key={index} src={element.icons[0].url} />
        })
    
    
        // const mappedPlay = playlist.map((element,index)=>{
        //     return <div style={{width: "60vw"}} >
        //             <img  style={{display: "flex", justifyContent:"center", height: "25vh", width: "25vw"}} key={index} src={element.images[0].url}/>
        //         </div>
        // })

       // console.log(mappedFeatures)
        //console.log(mappedPlay)


        return (
            <div>
         
                <span><h3>Hot Shit!!</h3></span>
                <MyCarousel2  featuresList={featuresList} list={list} />
                <span><h3>Album Study-Music</h3> </span>
                <MyCarousel1 playlist={playlist} list={list} />
                <span><h3>Album Hip-hop</h3></span>
                <MyCarousel list={list} />
            </div>
        )
    }
}

export default Dash;
