import React, {useState} from 'react'
import './Delete.scss'
import axios from 'axios';
import {connect} from 'react-redux'

const Delete =(props)=> {

    const [song, setSong] = useState('')
   
     

console.log(props.deleteSong)
const mapped = props.deleteSong.map((song,index)=>{
    return (
        <div key={index} >
<ul>
    {song.mp3_track_id}:
    { song.name}
</ul>
        </div>
    )
})
    return(
        <div className='delete' >
<b id='dd'> {mapped} </b>

        </div>
    )
}

const mapStateToProps = state =>{
    return{
        user:state.user,
        music:state.music
    }
}
export default  connect(mapStateToProps)(Delete)