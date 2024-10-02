const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const session = require('express-session')
const logger = require('morgan');
const Role = require('./models/Role');
require('dotenv').config();

const dbUsername = process.env.DB_USERNAME;
const dbPassword = process.env.DB_PASSWORD;
const dbName = process.env.DB_NAME;
const dbHost = process.env.DB_HOST;

const mongoUri = `mongodb+srv://${dbUsername}:${dbPassword}@${dbHost}/?retryWrites=true&w=majority&appName=${dbName}`;

mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        console.log('Connexion à MongoDB réussie !');
    })
    .catch((error) => console.log('Connexion à MongoDB échouée !', error));

const app = express();

app.use(cors());
app.use(logger('dev'));
app.use(express.json());

app.use(session({
    secret: 'RANDOM_TOKEN_SECRET',
    resave: false,
    saveUninitialized: true,
    cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'none', 
    },
}));

const usersRoutes = require('./routes/user');
const favoriteRoutes = require('./routes/favorite');
// app.use('/', indexRouter);
app.use('/api/auth', usersRoutes);
app.use('/api/favorite', favoriteRoutes);

module.exports = app;