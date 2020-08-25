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
//audio in state is what holds one songs when you select get local track
//songs in state is what holds multiple songs. 
  const [audio, setAudio] = useState([])
  const [songs, setSongs] = useState([])
//  const [index, setIndex] = useState(1)
  let [count, setCount] = useState(1)

 

  //This function is to retreive all the local tracks from the database
const getAllTracks=()=>{

  axios.get(`/api/tracks`)
  .then(res =>{
    setSongs(res.data)
  })
}

  //Use the index so I can cycle through the array's
  //filter the results
  // const filtered =() => {
  //   let output = songs.filter((song, index) => song.mp3_track_id === count)
  //   console.log(count)
  //   console.log(output)

  // }
//Add one to output count to increment the song
  const nextTrack=() => {
 setCount(count++)
  }
useEffect(()=>{

},[count])

// const nextTrack =()=> {
//   if(count === audio.length)
//       return;

//       setCount(count++)
// }


  //Subtract one from output count to decrement the count and got ot previous song
  const previousTrack=() => {
     
 setCount(count--)
  }

// const backTrack = () =>{
//   if(count === 1)
//    return;

//    setCount(count--)
// }



  const localTrack = () =>{
    
    axios.get(`/api/track/${2}`)
    .then((res)=>{
        setAudio(res.data)
    })
    .catch(err=>console.log(err))
    
}

let output = songs.filter((song, index) => song.mp3_track_id === count) 
let mappedSongs =[];
 mappedSongs= output.map(song =>song.track)

 const mappedCountAllTracks =output.map(song=>song.count)

console.log(mappedCountAllTracks)
//console.log(output)
console.log(mappedSongs)

const mappedCount = audio.map(ele =>ele.count)
const mappedName = audio.map(ele => ele.name)
let mappedTrack =[];
mappedTrack = audio.map(ele =>ele.track)

console.log(audio)
console.log(mappedCount.toString())
console.log(mappedTrack)


let choice = mappedTrack.length >1?mappedTrack:mappedSongs 
  
  return (
    <div className="App">
      <Header /> 
      <div id='left' >
        <Nav />
        </div>
        <div id='right' >
        
          {routes}
          <div id='audio'>


     {props.location.pathname ==="/" || props.location.pathname === "/drop" ? null:    


 

 
    <AudioPlayer style={{backgroundColor: '#0f0f0f'}}
       autoPlay
       showSkipControls={true}
       onClickPrevious={previousTrack}
       onClickNext={nextTrack}
       layout={'horizontal'}
       header={
        <div id='button-bag'>
        
        <button className='track-btns' onClick={localTrack} >Local Tracks</button>
        {mappedCount > 1 ? mappedCount.toString() + ` plays`: `[] plays`}
        <span>{mappedName}</span>
        <button className='track-btns' onClick={getAllTracks} >All Tracks</button>
        </div> 
        }
        src={choice}
        onPlay={e => console.log("onPlay") }
      />}

      </div>
    </div>
 
 
</div>
         
     
  );
}

export default withRouter(App);
