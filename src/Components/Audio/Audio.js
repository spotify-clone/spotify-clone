
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import React, {useState, useEffect} from 'react'

const Audio = () => {


    

    return(

        <div>
        <span>Audio Player</span>
    <AudioPlayer
      autoPlay
      src=" "
      onPlay={e => console.log("onPlay")}
      // other props here
    />
    </div>
  )
    }
  export default Audio