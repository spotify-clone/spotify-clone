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
        <div className="textForm">
            <button class="open-button" onClick="openForm()">Chat</button>
                <div class="chat-popup" id="myForm">
                    <form class="form-container">
                        <h1>Chat</h1>
                        <label for="msg"><b>Message</b></label>
                        <textarea placeholder="Type message.." name="msg" required></textarea>
                        <button type="submit" class="btn">Send</button>
                        <button type="button" class="btn cancel" onClick="closeForm()">Close</button>
                    </form>
                </div>
        </div>
    )
}

export default Chat