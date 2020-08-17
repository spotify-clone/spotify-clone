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

app.use(express.json())
 


 
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
app.post(`/auth/login-user`, authCtrl.LoginUser)
app.post(`/auth/new-user`, authCtrl.NewUser)
app.get('/auth/session', authCtrl.logMeIn)
app.get('/auth/logout', authCtrl.logOut)
app.post('/auth/user/:user' , authCtrl.saveLocalUser)


app.listen(3333, () =>console.log('Listening to port 3333'))




