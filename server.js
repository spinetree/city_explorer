'use strict';

// dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');

// why different syntax here?
require('dotenv').config();


// requires from externals
// require('./constructors');


// initiate app
const app = express();

// allow x-site from wherever
app.use(cors());

// port listener
const PORT = process.env.PORT || 3001;

// routes
app.get('*', () => console.log('default route here') )

// tell the app to start listening 
app.listen(PORT, () => console.log(`Listening on ${PORT}, let's party`) )

// helper functions
// error handler

// constructor functions
