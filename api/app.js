const express = require('express');
const app = express();
const bodyParser = require('body-parser')

const userRoute = require('./routes/users');
const groupRoute = require('./routes/groups');
const group_userRoute=require('./routes/groups_users')

// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))

// parse some custom thing into a Buffer
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))

// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());


app.use('/users', userRoute);
app.use('/groups', groupRoute);
app.use('/groups_users',group_userRoute);

module.exports = app;