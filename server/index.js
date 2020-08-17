require('dotenv').config()
const express = require('express'),
awsRouter = require('./controllers/awsRouter'), 
email = require('./controllers/emailController'),
session = require('express-session'),
authCtrl = require('./controllers/authController'),
trackCtrl = require('./controllers/trackControl'),
apiCtrl = require('./controllers/apiControl'),
{SESSION_SECRET, CONNECTION_STRING} = process.env,
massive = require('massive'),

app = express();


//Test for chat
const bodyParser = require('body-parser'),
socket = require('socket.io'),
cors = require('cors'),
{addUser, removeUser} = require('./controllers/chatController'),
router = require('./controllers/chatroutes'),
http = require('http'),
// server = http.createServer(app),
server = app.listen(3333)
io = socket(server);



app.use(cors())


app.use(bodyParser.json())

   app.use(router)

   io.on('connect', (socket) => {
    socket.on('join', ({ name, room }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room });
  
      if(error) return callback(error);
  
      socket.join(user.room);
  
      socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
  
      callback();
    });
  
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
  
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    });
  
    socket.on('disconnect', () => {
      const user = removeUser(socket.id);
  
      if(user) {
        io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
      }
    })
  });
  
 
    
    io.on('connection', socket =>{
    socket.on('message', ({name, message}) =>{
        io.emit('message', {name, message})
    })
})

io.on('connection', socket => {
  console.log('User Connected');
  io.emit('message dispatched', 'hello');
  socket.on('message sent', data => {
    console.log(data)
    socket.broadcast.emit('message dispatched', data.message);
  })
  socket.on('disconnect', () => {
    console.log('User Disconnected');
  })
});





app.use(express.json())
 
app.use(awsRouter)


 
app.use(session({
    secret: SESSION_SECRET,
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
     
    console.log('we are connected to our database')
})

 

//Email EndPoint
app.post(`/api/email`, email.email)

//tracks
app.get(`/api/track`, trackCtrl.getTracks)
app.post('/api/track', trackCtrl.createTrack)

app.get('/api/artist/:id' , apiCtrl.getArtist)
app.get('/api/user', apiCtrl.getUser)
app.post('/api/user/:user', authCtrl.saveLocalUser)

app.get('/api/playlist', apiCtrl.getPlaylist)
app.get('/api/albums', apiCtrl.getAlbums)

//Auth EndPoint
app.get('/auth/logIn', authCtrl.logMeIn)
app.get('/auth/logout', authCtrl.logOut)
app.post('/auth/user/:user' , authCtrl.saveLocalUser)






