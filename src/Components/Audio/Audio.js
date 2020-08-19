import axios from 'axios'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import React, {useState, useEffect} from 'react'

const Audio = (props) => {

// const [audio, setAudio] = useState([])

// useEffect(()=>{
 
// axios.get(`/api/track/`)
// .then((res)=>{
//     setAudio(res.data)
// })
// .catch(err=>console.log(err))

// },[])
//     const mappedTrack = audio.map(ele =>ele.track)
// console.log(mappedTrack)
//     console.log(audio[0])

    return(

        <div>
        <span><h2>Fresh Tracks</h2></span>
    <AudioPlayer
      autoPlay
      src={props.mappedTrack}
      onPlay={e => console.log("onPlay")}
      // other props here
    />
    </div>
  )
    }
  export default Audio