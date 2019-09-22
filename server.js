/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
'use strict';


// ---------- Dependencies

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superagent = require('superagent');

// why different syntax here? This is a method dotenv gives us access to?
require('dotenv').config();

// ----- end dependencies



// ---------- run all the big picture things

// initiate express app
const app = express();

// allow x-site from wherever
app.use(cors());

// port listener
const PORT = process.env.PORT || 3001;

// tell the app to start listening
app.listen(PORT, () => console.log(`Listening on ${PORT}, let's party`) )


// ---------- routes

app.get('*', () => console.log('default route here') )

// ---------- end routes




// ---------- Constructor Functions

// do not fully grok this second line which seems to only be for constructor functions, gotten from https://stackabuse.com/how-to-use-module-exports-in-node-js/ but seems to work

let locations = require('./location.js');
let Location = locations.Location;

let weathers = require('./weather.js');
let Weather = weathers.Weather;

let events = require('./event.js');
let Event = events.Event;

// ----- end constructor functions


// error handler



// tests
Location('derpQuery','derpFormatted','234234','q34');
Weather({summary:'Example daily summary', time: 8287888399});
Event({url:'someURL', name: {text:'thisname'}, start: {local:[3,4,5,2,24,5]} });
