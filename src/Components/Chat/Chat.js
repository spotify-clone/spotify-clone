import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
//import TextField from '@material-ui/core/TextField'
import queryString from 'query-string'
import './Chat.css'


let socket;

function Chat({location}) {
  
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [message, setMessage] = useState('');
const ENDPOINT = 'localhost:3333'
   
useEffect(()=>{
        const {name,room} = queryString.parse(location.search)
socket = io.connect();
      setName(name)
      setRoom(room)

      console.log(socket)
socket.on('message', message =>setMessage(draft => {
    draft.push(['', message])
}))
      // socket.emit('join', {name, room})
    },[ENDPOINT,location.search])
   
      

    return (
        <div>
        <h1>Chat</h1>
        <input 
            type='text'
            name='text'
            onChange={(e)=>e.target.value}
        />
        <textarea>{setMessage}</textarea>
        </div>
    )
}

export default Chat