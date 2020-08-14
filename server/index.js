require('dotenv').config()
const express = require('express'),
awsRouter = require('./controllers/awsRouter'), 
session = require('express-session'),

app.use(express.json())