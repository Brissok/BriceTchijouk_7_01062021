require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { Sequelize } = require('sequelize');
const { sequelize, User } = require('./models');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('cookie-session');

const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
}); 

// Options pour sécuriser les cookies
var expiryDate = new Date( Date.now() + 60 * 60 * 1000 ); // 1 hour
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'groupomania',
  name: 'session',
  keys: ['key1', 'key2'],
  cookie: { 
            httpOnly: true,
            expires: expiryDate
          }
  })
);

app.use(bodyParser.json());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/auth', userRoutes);

module.exports = app;