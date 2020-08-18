import React, { Component } from 'react'

class Player extends Component {
    constructor(props){
        super(props)

        this.state={
            play: false,
            pause: true
        }

        this.url = "https://p.scdn.co/mp3-preview/93e6cdc0f8d46ff0d4dc1b9325f4a064ba32c5c8?cid=d6e4efa4cad54f1d8498c54e41953c30"
        this.audio = new Audio(this.url);
    };

    
    componentDidMount = () =>{
        // axios.get('/api/artist-track')
        // .then(res=>{
        //     if(res.data && res.data.length !== track.length){
        //         setTrack(res.data)
        //     }
        // })
        // .catch(error => console.log(error))
    }


    play = () => {
        this.setState({ play: true, pause: false })
          this.audio.play();
        }
        
        pause = () => {
        this.setState({ play: false, pause: true })
          this.audio.pause();
        }
        
        render() {
          
        return (
          <div style={{height: "30vh", width: "30vw", position: "absolute", top: 500, left: 500}}>
            <button style={{padding: 20}} onClick={this.play}>Play</button>
            <button style={{padding: 20}} onClick={this.pause}>Pause</button>
          </div>
          );
        }
    }

    export default Player
