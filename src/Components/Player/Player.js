import React, { Component } from 'react'
import axios from 'axios'
import {Howl, Howler} from 'howler'


class Player extends Component {
    constructor(props){
        super(props)

        this.state={
            tracks: [],
            audio: false
        }

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


    startSound = async(value)=> {
    let sound = new Howl({
        src: value,
        html5:true,
        onplay: function(){
            this.setState({audio: true})
        }
    }).play() 

        sound = new Howl({
            src: value,
            html5:true
        })

        var id = sound.play();

        this.state.audio ? sound.play() : this.setState({url: ""})
        
        var id = sound.play();
        sound.pause(id);


    }

    // stopSound = async(value) =>{
    //     this.setState({audio: !this.state.audio})
    //     console.log('hit')
    //     console.log(this.state.audio)
        
    //     let sound = await new Howl({
    //         src: [],
    //         html5:true
    //     })
        
    //     if(this.state.audio){
    //         sound.stop()
    //     }
    // }

    



        render() {

            const { tracks, url } = this.state
            const mappedTracks = tracks.map((element,index)=>{
                let image;
                let audio;

                if(element.preview_url !==null){
                    image = element.album.images[1].url
                    audio = element.preview_url
                }
                return <div key={index}>
                        {this.state.audio
                        ?
                        <button style={{padding: 20}} onClick={() => this.startSound}><img src={image} alt=""/></button>
                        :
                        <button style={{padding: 20}} onClick={() => this.startSound(audio)}><img src={image} alt=""/></button>
                        }
                    </div>
            })

        return (
          <div>
              <div style={{position: "absolute", top: "50%", right: "20%"}}>
              {mappedTracks}  
                  </div> 
                <div>
                    {this.state.audio
                    ?
                    <button style={{padding: 20}} onClick={this.startSound}>Pause</button>
                    :
                    <button style={{padding: 20}} onClick={this.stopSound}>Play</button>
                    }
                </div>
          </div>
          );
        }
    }

    export default Player