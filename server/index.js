require('dotenv').config()
const express = require('express'),
awsRouter = require('./controllers/awsRouter'), 
email = require('./controllers/emailController'),
session = require('express-session'),
authCtrl = require('./controllers/authController'),
apiCtrl = require('./controllers/apiControl'),
local = require('./controllers/localController'),
{SESSION_SECRET, CONNECTION_STRING, SERVER_PORT} = process.env,
massive = require('massive'),

app = express();


//Test for chat we aren't using the chat controller as of right now because I don't have rooms, but maybe
const bodyParser = require('body-parser'),
socket = require('socket.io'),
cors = require('cors'),
{addUser, removeUser} = require('./controllers/chatController'),
router = require('./controllers/chatroutes'),
http = require('http'),
server = app.listen(3333),
io = require('socket.io').listen(server);

//I moved around app dot listen to create a securer connection, this is also more familiar

app.use(cors())


app.use(bodyParser.json())

   app.use(router)



   //Sockets connection
io.on('connection', socket => {
  console.log('User Connected');
  io.emit('message dispatched', 'hello');
 
  socket.on('message', ({name, message, roomId}) =>{

    console.log( "Hit socket on message ",message, roomId)

    if(!roomId && !roomId.rooms && !roomId.rooms[1]) return;
     io.in(roomId.rooms[1]).emit('message from server', {name, message})
      
  })

  socket.on('message sent', data => {
    // console.log(data)
   // socket.broadcast.emit('message dispatched', data.message);
   if(!data && !data.roomId && !data.roomId.rooms && !data.roomId.rooms[1]) return;
     io.to(data.roomId.rooms[1]).emit('message data', {data: data.data});
  })

  socket.on('join room', data => {
    console.log(data)
    session.room = data
     let rooms;
    console.log('room joined', data.room)
    socket.join(data.room, () =>{
     rooms = Object.keys(socket.rooms)
   //   console.log(rooms)
      io.to(data.room).emit('room joined', {rooms});
    });
  
  })
  // socket.on('message sent', data => {
  //   io.to(data.room).emit('message data', data);
  // })
  
  socket.on('disconnect', () => {
    console.log('User Disconnected');
  })
});





app.use(express.json())
 

//Using AWS Router
app.use(awsRouter)


 //Session information
app.use(session({    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 26
    }
}))

massive({
    connectionString: CONNECTION_STRING,
    ssl: {rejectUnauthorized: false}
})
.then(db =>{
    app.set('db',db)
     
    console.log('we are connected to our database-Welcome To Port 3333 da player')
})

 

//Email EndPoint
app.post(`/api/email`, email.email)

//local
app.get('/api/track/:id', local.getTrack)
app.get(`/api/tracks`, local.getTracks)
app.get('/api/user-tracks/:id', local.getUsersTrack)
app.delete(`/api/user-track/:id`, local.deleteTrack)

app.put(`/api/local/:id`, local.addName)
app.put('/api/local2/:id', local.updatePic)
app.post(`/api/track/:id`, local.createTrack)
app.post(`/api/track-count/:id`, local.increaseCount)


//endpoints to spotify api
app.get('/api/user/:id', apiCtrl.getUser)
app.get('/api/user-playlist/:id', apiCtrl.getUserPlaylist)
app.get('/api/playlist', apiCtrl.getPlaylist)
app.get('/api/new-releases', apiCtrl.getNewReleases)
app.get('/api/features', apiCtrl.getFeatures)
app.get('/api/artist-track/:id', apiCtrl.getArtistTracks)
app.get('/api/search/', apiCtrl.searchApi)
app.get('/api/artist-album/:id', apiCtrl.getArtistAlbums)
app.get('/api/playlist-tracks/:id',apiCtrl.getTracksInPlaylist)
app.delete('/api/delete-track/:id', apiCtrl.deleteTrack)


//Auth EndPoint
app.get(`/auth/me`, authCtrl.logMeIn)
app.post(`/auth/login-user`, authCtrl.LoginUser)
app.post(`/auth/new-user`, authCtrl.NewUser)
app.get('/auth/session', authCtrl.logMeIn)
app.get('/auth/logout', authCtrl.logOut)
app.post('/auth/user/:user' , authCtrl.saveLocalUser)


app.use(express.static(__dirname + '/../build'))
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
  })

// app.use( express.static( `${__dirname}/../build` ) );

// app.get('*', (req,res)=>{
//   res.sendFile(path.join(__dirname, '../build/index.html'))
// })



