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
    const [list, setList] = useState([])


//Function to join room
 useEffect(()=>{

     axios.get(`/api/tracks`)
     .then(res =>{
        setList(res.data)
     })
 },[])

  
  let mapList = list.map((ele,ind)=>{
      return (
          <div key={ind}> 
              {/* <button onClick={() => setData(ele.track)}><p>{ele.track}</p></button> */}
             <ul>
                <li onClick={(e) => setData(ele.track)}>{ele.track}</li>
            </ul> 
          </div>
      )
  })

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
}, [ ])


//Atempting to add Join success to a use effect passing in data...
useEffect(() =>{
    socket.on('room joined', data =>{
        joinRoom()
        if(joined) joinSucess(data);
    })
},[joined])


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
        socket.emit('message sent', {data:data})
    }
    
    //   if (data) {
    //     socket.emit('message', { data, name })
            
    // }
    setMessage(data[0])
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
 //let mp3 = receivedMessages.includes('.mp3')?receivedMessages:null
 console.log(receivedMessages[0])


//Mapping the returned messages from the server the display
    const mappedMessages = receivedMessages.map((word, index) => {
        return (
            <div key={index} >
            <span>{word.name} Says: </span>
                <span> { word.message}</span>
                <h3> 
        {word.data? <a href={word.data}><p>{word.data}</p></a>:null }
                </h3>
            </div>
        )
    })
    // word.data.toString('').slice(79,94)
     console.log("data", data)

    //Trying to create a condition where the name box goes away after the informaion is entered.
    //Right now since any value makes it truthy it goes away....
    return (
        <div>
        {mapList}
        <div id='chat-div'>     
            <button id='open-button' onClick={() => setShowChat(!showChat)}>CHAT</button>
            {true?
            <div id='room' > 
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
                    {/* <h3>Enter Your name</h3>
                        <input className='name-input'
                            type='text'
                            name='name'
                            onChange={(e) => setName(e.target.value)}
                        /> */}
                    <h1>chatbox</h1>
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
             <button id='share' onClick={sendMusic} >Share Music</button>
                <button id='share' onClick={reduxMusic} >Get Music</button>
                </div>
            </div> 
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
