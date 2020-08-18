import React, { useState, useEffect } from 'react'
import io from 'socket.io-client'
//import TextField from '@material-ui/core/TextField'
import queryString from 'query-string'
//import './chat.scss
import {connect} from 'react-redux'


let socket;

function Chat(props) {

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [message, setMessage] = useState('');
    const [receivedMessages, setReceivedMessages] = useState([])
    const [toggle, setToggle] = useState(false)
    const ENDPOINT = 'localhost:3333'



    //First end point connecting the socket to the end point
    useEffect(() => {
        socket = io.connect(ENDPOINT)
        const { name, room } = queryString.parse(props.location.search)
         setName(props.user.email)
        setRoom(room)

        console.log(socket)

     }, [props.location.search])


//Receiving the message from the server and then setting it on state
    useEffect(() => {
        socket.on('message from server', message => {
            console.log(message)
 //This is the same as saying prev state =>prev state using
            setReceivedMessages(receivedMessages => [...receivedMessages, message])

        })
    }, [])


const toggled = () => {
    setToggle(!toggle)
}

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
    console.log(props)
    console.log(name)

    //Trying to create a condition where the name box goes away after the informaion is entered.
    //Right now since any value makes it truthy it goes away....
    return (
        <div>
            {mappedMessages}
            <h1>Chat</h1>
                <div>
                    <span>Enter Your name</span>

                    <input
                        className='name-input'
                        type='text'
                        name='name'
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
            <h1>Chat</h1>
            <input
                type='text'
                name='text'
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event, name) : null}
            />
            <button onClick={(e) => sendMessage(e)} >Send</button>
            
            {mappedMessages}
            
        </div>
    )
}
const mapStateToProps = state => state
export default connect(mapStateToProps)(Chat)