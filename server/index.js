require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');
const session = require('express-session');

app.use( express.json() );
let { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;

massive( CONNECTION_STRING )
.then( db => {
    console.log('Excellent!');
    app.set('db', db);
} )
.catch( err => console.error(err) );

app.use(
    session({
        resave: false,
        saveUninitialized: true,
        secret: SESSION_SECRET,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 * 7
        }
    })
)

app.listen( SERVER_PORT, () => console.log('Party on, Wayne!') );



const controller = require('./controller');
let { registerUser, login, getAllPosts, getFilteredPosts } = controller;

// Auth

app.post('/auth/register', registerUser);
app.post('/auth/login', login);

// Posts

app.get('/api/posts/', getAllPosts);
app.get('/api/posts/:id', getFilteredPosts);