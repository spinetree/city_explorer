/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
'use strict';

// dependencies
const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');

// why different syntax here?
require('dotenv').config();


// Constructor Functions
let locations = require('./location.js');
let Location = locations.Location;
// do not fully grok this last piece, gotten from https://stackabuse.com/how-to-use-module-exports-in-node-js/ but seems to work

//test
Location('derp','derpFormatted','234234','q34');


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


