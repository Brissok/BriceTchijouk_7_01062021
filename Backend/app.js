require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session');


const userRoutes = require('./routes/user');
const postRoutes = require('./routes/post');
const commentRoutes = require('./routes/comment');

const app = express();

app.use(helmet());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  next();
}); 

// Options pour sécuriser les cookies
const hour = 3 * 24 * 60 * 60 * 1000;
const expiryDate = new Date(Date.now() + hour);
app.set('trust proxy', 1); // trust first proxy
app.use(
	session({
		secret: process.env.SEC_SES,
		name: 'sessionId',
		resave: false,
		saveUninitialized: true,
		cookie: {
			secure: false,
			expires: expiryDate,
		},
	}),
);

app.use(bodyParser.json());
app.use(cookieParser());

app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/posts', postRoutes);
app.use('/comments', commentRoutes);
app.use('/auth', userRoutes);

module.exports = app;