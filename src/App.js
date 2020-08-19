import React, {useState, useEffect} from 'react'
import routes from './routes'
import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import Audio from './Components/Audio/Audio'
 import { withRouter } from 'react-router-dom';
 import axios from 'axios'


function App() {

  const [audio, setAudio] = useState([])

  useEffect(()=>{
   
  axios.get(`/api/track/`)
  .then((res)=>{
      setAudio(res.data)
  })
  .catch(err=>console.log(err))
  
  },[])
      const mappedTrack = audio.map(ele =>ele.track)
  console.log(mappedTrack)
      console.log(audio[0])

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
<Audio track={mappedTrack} />
</div>
          </div>
    </div>
  );
}

export default withRouter(App);
