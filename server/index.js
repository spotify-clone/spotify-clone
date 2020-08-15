require('dotenv').config()
const express = require('express'),
awsRouter = require('./controllers/awsRouter'), 
email = require('./controllers/emailController'),
session = require('express-session'),
app = express();

app.use(express.json())

//AWS connection
app.use(awsRouter);

//Email EndPoint
app.post(`/api/email`, email.email)


app.listen(3333, () =>console.log('Listening to port 3333'))