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

  // const addCount = () => {
  //   setCount( +count+ 1)
  // }

const sendCount = () => {

  // axios.put()

}

  useEffect(()=>{
   
  axios.get(`/api/track/${1}`)
  .then((res)=>{
      setAudio(res.data)
  })
  .catch(err=>console.log(err))
  
  },[])
const mappedCount = audio.map(ele =>ele.count)
  
      const mappedTrack = audio.map(ele =>ele.track)
  // console.log(mappedTrack)
  //     console.log(audio[0])

  
  return (
    <div className="App">
      <Header />
      <div id='left' >
        <Nav />
        </div>
        <div id='right' >
        {/* <Chat /> */}
          {routes}
          <div id='audio'>
        
<div >
 
     <AudioPlayer 
      // autoPlay
      src={mappedTrack}
      onPlay={e => console.log("onPlay") }
      footer= {mappedCount + '  plays'} 

       
       
      // other props here
    />

</div>
    </div>
 
</div>
          </div>
     
  );
}

export default withRouter(App);
