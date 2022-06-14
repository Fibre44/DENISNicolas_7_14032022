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
const inviteRoute = require('./routes/invite')
const path = require('path');
const multer = require('multer')
const formData = multer()
const { application } = require('express');
const env = require('dotenv').config()
const envHelmet = process.env.HELMET
const envSecure = process.env.SECURE


app.use((req, res, next) => {

  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//En local helmet bloque le chargement des images car erreur de politique CORS. Le front est sur localhost=3000 mais les images sont sur localhost:3001
if (envHelmet === 'true') {
  const helmet = require('helmet');
  app.use(helmet())
  console.log('Attention Helmet est actif sur le serveur')
} else {
  console.log('Helmet est inactif')
}
console.log('La variable Secure est sur la valeur : ' + envSecure)

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.use('/upload', express.static(path.join(__dirname, 'upload')));

app.use('/api/v1/users', userRoute);
app.use('/api/v1/groups', groupRoute);
app.use('/api/v1/groups_users', group_userRoute);
app.use('/api/v1/message', messageRoute);
app.use('/api/v1/comment', commentRoute);
app.use('/api/v1/admin', adminRoute);
app.use('/api/v1/like', likeRoute);
app.use('/api/v1/invite', inviteRoute);

module.exports = app;