import React, {useState, useEffect} from 'react'
import routes from './routes'
import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';

import { withRouter } from 'react-router-dom';
import axios from 'axios'

import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
 

function App(props) {

  const [audio, setAudio] = useState([])
  let [count, setCount] = useState('')

 

  //This function is to retreive all the local tracks from the database
const getAllTracks=()=>{

  axios.get(`/api/tracks`)
  .then(res =>{
    setAudio(res.data)
  })
}

   
  
  const localTrack = () =>{
    
    axios.get(`/api/track/${2}`)
    .then((res)=>{
        setAudio(res.data)
    })
    .catch(err=>console.log(err))
    
}
const mappedCount = audio.map(ele =>ele.count)
  const mappedName = audio.map(ele => ele.name)
  const mappedTrack = audio.map(ele =>ele.track)

  console.log(audio)
  console.log(mappedCount.toString())
  console.log(mappedTrack)

  return (
    <div className="App">
      <Header /> 
      <div id='left' >
        <Nav />
        </div>
        <div id='right' >
        
          {routes}
          <div id='audio'>
        
     <AudioPlayer 
       //autoPlay
       showSkipControls={true}
       header={
       <div id='button-bag'>
       <button onClick={localTrack} >Local Tracks</button>
       <span>{mappedName}</span>
       <button onClick={getAllTracks} >All Tracks</button>
       </div> 
       }
      src={mappedTrack}
      onPlay={e => console.log("onPlay") }
      footer={mappedCount > 1?mappedCount.toString() + ` plays`: `[] plays`}
    />
    

</div>
    </div>
 
 
</div>
         
     
  );
}

export default withRouter(App);
