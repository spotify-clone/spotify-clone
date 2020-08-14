require('dotenv').config()
const express = require('express'),
awsRouter = require('./controllers/awsRouter'), 
session = require('express-session'),
apiCtrl = require('./controllers/apiControl');



app = express();
app.use(express.json())
app.use(awsRouter);


app.get('/api/user', apiCtrl.getUser)
app.get('/api/track', apiCtrl.getTracks)
app.get('/api/playlist', apiCtrl.getPlaylist)
app.get('/api/episode', apiCtrl.getEpisode)






app.listen(3333, () =>console.log('Listening to port 3333'))