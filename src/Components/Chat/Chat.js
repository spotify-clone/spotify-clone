import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
//import TextField from '@material-ui/core/TextField'
import queryString from 'query-string'
import './Chat.css'


let socket;

function Chat({ location }) {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([])
    const ENDPOINT = 'localhost:3333'



    //First end point connecting the socket to the end point
    useEffect(() => {
        socket = io.connect(ENDPOINT)
        const { name, room } = queryString.parse(location.search)
         setName(name)
        setRoom(room)

        console.log(socket)

     }, [location.search])


//Receiving the message from the server and then setting it on state
    useEffect(() => {
        socket.on('message from server', message => {
            console.log(message)
 //This is the same as saying prev state =>prev state using a component
 
            setReceivedMessages(receivedMessages => [...receivedMessages, message])

        })
    }, [])




    const sendMessage = (event) => {
        console.log('hit send message', message)
        if (message) {
            socket.emit('message', { message, name })
        }
    }

//Mapping the returned messages from the server the display
    const mappedMessages = receivedMessages.map((word, index) => {
        return (
            <div key={index} >
            <span>{word.name} says: </span>
                <span> { word.message}</span>
            </div>
        )
    })
    console.log(name)

    //Trying to create a condition where the name box goes away after the informaion is entered.
    //Right now since any value makes it truthy it goes away....
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