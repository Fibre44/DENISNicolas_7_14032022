const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const userRoute = require('./routes/users');
const groupRoute = require('./routes/groups');
const group_userRoute = require('./routes/groups_users');
const messageRoute = require('./routes/message');
const commentRoute = require('./routes/comments');
const adminRoute = require('./routes/admin');
const likeRoute = require('./routes/like');
const path = require('path');
const multer = require('multer')
const formData = multer()


app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
//Gestion des objets form data
app.use(formData.array())
app.use(express.static('images'));


app.use('/api/v1/users', userRoute);
app.use('/api/v1/groups', groupRoute);
app.use('/api/v1/groups_users', group_userRoute);
app.use('/api/v1/message', messageRoute);
app.use('/api/v1/comment', commentRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/like', likeRoute);

module.exports = app;