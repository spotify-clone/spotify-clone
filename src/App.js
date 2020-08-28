import React, {useState, useEffect} from 'react'
import routes from './routes'
import './App.css';
import Header from './Components/Header/Header';
import Nav from './Components/Nav/Nav';
import { withRouter } from 'react-router-dom';
import axios from 'axios'
import {getUser} from './Redux/musicReducer'
import AudioPlayer from 'react-h5-audio-player'
import 'react-h5-audio-player/lib/styles.css'
import {connect} from 'react-redux'

function App(props) {
//audio in state is what holds one songs when you select get local track
//songs in state is what holds multiple songs. 
  const [audio, setAudio] = useState([])
  const [songs, setSongs] = useState([])
//  const [index, setIndex] = useState(1)
  let [count, setCount] = useState(0)

  
 useEffect(()=>{

  axios.get(`/auth/me`)
  .then((res)=>{
      props.getUser(res.data)
  })

 },[])

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
    console.log(props.music.user.account_id)
    axios.get(`/api/user-tracks/${props.music.user.account_id}`)
    .then((res)=>{
      // console.log(res.data)
        setAudio(res.data)
    })
    .catch(err=>console.log(err))
    
}

//Filter and Map function to grab the individual objects out of the array and play them on source
let output = songs.filter((song, index) => index === count) 
let mappedSongs =[];
 mappedSongs= output.map(song =>song.track)
 
 const mappedCountAllTracks =output.map(song=>song.count)
const mappedAllName = output.map(song=>song.name)


 let localSongs = audio.filter((song, index) => index === count)
 let mappedLocal = localSongs.map(song => song.track);
 let mappedLocalCount = localSongs.map(song => song.count)

// console.log(mappedLocal)
//console.log(mappedLocalCount)
// console.log(mappedSongs)

//const mappedCount = audio.map(ele =>ele.count)
const mappedName = audio.map(ele => ele.name)
//let mappedTrack =[];
//mappedTrack = audio.map(ele =>ele.track)

  // console.log(audio)
// console.log(mappedCount.toString())
 //.log(props.music.user.account_id)


//let choice = mappedTrack.length >1?mappedTrack:mappedSongs 
  
const playTrack=(id)=>{
  console.log('Play Track')
  axios.post(`/api/track-count/${id}`)
    .then(res => console.log(res.data))
}


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
      //  autoPlay
       showSkipControls={true}
       onClickPrevious={previousTrack}
       onClickNext={nextTrack}
       layout={'horizontal'}
       header={
        <div id='button-bag'>
        <span>Track Title: {  mappedName.length?mappedName:mappedAllName}</span>
        <button  className='track-btns' onClick={localTrack} >Local Tracks</button>
        {/* <span id='spaner' >{ ` plays`}</span>
        <span>{mappedLocal.length?mappedLocalCount:mappedCountAllTracks}</span> */}
        <button className='track-btns' onClick={getAllTracks} >All Tracks</button>
        </div> 
        }
        src={mappedLocal.length?mappedLocal:mappedSongs}

        onPlay={output[0]?e => playTrack(output[0].mp3_track_id):e=>console.log('Play') }
      footer={ <span id='spanny' >{mappedLocal.length?mappedLocalCount:mappedCountAllTracks} plays</span>}
      />
      }
      </div>
    </div>
 
</div>
         
     
  );
}


const mapStateToProps = state => {
  return{
      music: state.music,
      user: state.user
  }
}
export default withRouter(connect(mapStateToProps, {getUser})(App));
