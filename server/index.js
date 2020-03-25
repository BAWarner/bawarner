require('dotenv').config();
const express = require('express');
const app = express();
const massive = require('massive');

app.use( express.json() );
let { SESSION_SECRET, CONNECTION_STRING, SERVER_PORT } = process.env;

massive( CONNECTION_STRING )
.then( db => {
    console.log('Excellent!');
    app.set('db', db);
} )
.catch( err => console.error(err) );

app.listen( SERVER_PORT, () => console.log('Party on, Wayne!') );