import React, { Component } from 'react'
import axios from 'axios'
import {Howl, Howler} from 'howler'

class Player extends Component {
    constructor(props){
        super(props)

        this.state={
            tracks: [],
            play: false,
            pause: true,
            audio: false,
            url: "",
        }
        this.sound = new Howl({src: this.state.url, html5:true})

    };


    componentDidMount = () =>{
        axios.get('/api/artist-track')
        .then(res=>{
            if(res.data && res.data.length !== this.state.tracks.length){
                this.setState({tracks: res.data})
            }
        })
        .catch(error => console.log(error))
    }


    soundPlay = (value)=> {
        const { audio } = this.state

        this.setState({audio: !this.state.audio, url: value})

        let sound = null;
        if (sound != null) {
            sound.stop();
            sound.unload();
            sound = null;
        }

        sound = new Howl({
            src: value,
            html5:true
        })

        // var id = sound.play();

        audio ? sound.play() : this.setState({url: ""})
        
        // var id = sound.play();
        // sound.pause(id);


    }

    

    // handleToggle = (value) => {
    //     this.setState({audio: !this.state.audio, url: value});
    //     this.queueSound()
        
    // }

    queueSound = () =>{
 
        // const { audio } = this.state   

        //     if(audio === true){
        //         console.log('hit')
        //         this.audio.play();
        //     }
        //     else{
        //         this.audio.pause();
        //     }

    }




        render() {

            const { tracks, url } = this.state

            const mappedTracks = tracks.map((element,index)=>{
                let image;
                let audio;

                if(element.preview_url !==null){
                    image = element.album.images[1].url
                    audio = element.preview_url
                }

                return <img key={index} src={image} alt="" onClick={() => this.soundPlay(audio)}/>

            })





        return (
          <div>
              <div style={{position: "absolute", left: "25%"}}>
              {mappedTracks}  
                  </div> 
                <div>
                    <button style={{padding: 20}} onClick={this.play}>Play</button>
                    <button style={{padding: 20}} onClick={this.pause}>Pause</button>
                </div>
          </div>
          );
        }
    }

    export default Player

