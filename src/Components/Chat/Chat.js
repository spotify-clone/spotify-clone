import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
import queryString from 'query-string'
import {connect} from 'react-redux'
import './chat.scss'
import {getMusic} from '../../Redux/musicReducer'
import axios from 'axios'



let socket;

function Chat(props) {

   
    const [name, setName] = useState('');
    const [room, setRoom] = useState(null);
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([])
    const [showChat, setShowChat] = useState(false);
    const ENDPOINT = 'localhost:3333'
    const [data, setData] = useState(false)
    let [num, setNum] = useState(0)
    let [joined, setJoined] = useState(false)


//Function to join room


    //First end point connecting the socket to the end point
    useEffect(() => {
        socket = io.connect(ENDPOINT)
        const { name, room } = queryString.parse(props.location.search)
        setName(props.music.user.email)
        setRoom(room)
console.log(props)
        console.log(socket)

     }, [props.location.search])


//Create a function that pools a song from the database that a user selects and gets stored in their local state


     //My thought process behind this was cause I used it for server and I'd someone be able to save data 
     //right now I don't know If i'm sending new data or just displaying what's in state
useEffect(()=>{

    socket.on('message data', data => {
        console.log(data, "use effect")
//This is the same as saying prev state =>prev state using
        setReceivedMessages(receivedMessages => [...receivedMessages, data])

    })
    // socket.emit('message sent', {data})
}, [data])


//Atempting to add Join success to a use effect passing in data...
useEffect(() =>{
    socket.on('room joined', data =>{
        joinRoom()
        if(joined) joinSucess(data);
    })
},[data])


//Receiving the message from the server and then setting it on state
    useEffect(() => {
      
        socket.on('message from server', message => {
            console.log(message)
 //This is the same as saying prev state =>prev state using
            setReceivedMessages(receivedMessages => [...receivedMessages, message])

        })
    }, [])


    //Function to send music to back end so Users can share music
const sendMusic = () =>{
    setNum(num++)
   // setData('https://spotify-bucket33.s3.amazonaws.com/c499c9e9-4a6d-4e4f-b59f-8695dee7c236-Black-Tom-Brady---11_12_17,-11.03-AM.mp3')
    console.log('hit send music', data)
    if(data){
        socket.emit('message sent', {data:data[0]})
        
    }
   // console.log(data)
}

const joinRoom = () => {
    if(room){
        socket.emit('join room', {
            room: room
        })
    }
    
}

const joinSucess = () => {
    setJoined(true)
}

    const sendMessage = (event) => {
        console.log('hit send message', message)
        if (message) {
            socket.emit('message', { message, name })
            
        }
    }




//Function to add linked item to redux 
const reduxMusic = (num) => {

  axios.get(`/api/track/${9}`)
  .then(res=>{
      let mappedTracks = res.data.map((song, index) =>song.track)
      setData(mappedTracks)
      console.log(mappedTracks)
      props.getMusic(mappedTracks)
  })

}

console.log(room)
//Mapping the returned messages from the server the display
    const mappedMessages = receivedMessages.map((word, index) => {
        return (
            <div key={index} >
            <span>{word.name} Says: </span>
                <span> { word.message}</span>
            </div>
        )
    })
    
     console.log("data", data)

    //Trying to create a condition where the name box goes away after the informaion is entered.
    //Right now since any value makes it truthy it goes away....
    return (
        <div>
             
             <button id='open-button' onClick={() => setShowChat(!showChat)}>CHAT</button>
            {true?
            <div  > 
            <h2>My Room: {room}  </h2>
            <button onClick={joinRoom} >Enter</button> 
            <input 
            text='text'
            name='room'
            required
            placeholder='Enter The Room'
            onChange={(e)=>setRoom(e.target.value)}    

            />
            </div>:
             null}
                <div className='chat-container'>  
                    <h3>Enter Your name</h3>
                        <input className='name-input'
                            type='text'
                            name='name'
                            onChange={(e) => setName(e.target.value)}
                        />
                    <h1>chat</h1>
                        <input className='chat-input'
                            type='text'
                            name='text'
                            onChange={(e) => setMessage(e.target.value)}
                            onKeyPress={event => event.key === 'Enter' ? sendMessage(event, name) : null}
                        />
                    <button className="btn" onClick={(e) => sendMessage(e)} >Send</button>
                    
                    <div className='mapped-messages'>
                        {mappedMessages }
                       {data ?<div>{name} says,
                       <a href={data}  >
                         ...Hear My Music</a> </div> :null }
                    </div>
                    <button className='btn' onClick={() => setShowChat(!showChat)}>close</button>
                </div>
                <button id='share' onClick={reduxMusic} >Get Music</button>
             <button id='share' onClick={sendMusic} >Share Music</button>
            </div> 
               
        
    )
}
const mapStateToProps = state => {
    return{
        music: state.music,
        user: state.user
    }
}
export default connect(mapStateToProps, {getMusic})(Chat);
