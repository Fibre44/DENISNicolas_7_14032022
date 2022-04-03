const express = require('express');
const app = express();

const userRoute = require('./routes/users');
const groupRoute = require('./routes/groups');
const group_userRoute=require('./routes/groups_users');
const messageRoute = require('./routes/message');


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
app.use('/message',messageRoute);

module.exports = app;