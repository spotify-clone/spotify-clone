require('dotenv').config()
const express = require('express'),
awsRouter = require('./controllers/awsRouter'), 
session = require('express-session'),
app = express();

app.use(express.json())

app.use(awsRouter);

app.listen(3333, () =>console.log('Listening to port 3333'))