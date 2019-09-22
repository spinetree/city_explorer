/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */
'use strict';

// globals

let currentLocation = {};



// ---------- Dependencies

const express = require('express');
const cors = require('cors');
const pg = require('pg');
const superAgent = require('superagent');

// why different syntax here? This is a method dotenv gives us access to?
require('dotenv').config();



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

app.get('/location', (request, response) => getLocation(request, response) );

app.get('/weather', (request,response) => getWeather(request, response) );

app.get('*', () => console.log('default route here') );



// ---------- imports


// do not fully grok this second line which seems to only be for constructor functions, gotten from https://stackabuse.com/how-to-use-module-exports-in-node-js/ but seems to work

let locations = require('./location.js');
let Location = locations.Location;

let weathers = require('./weather.js');
let Weather = weathers.Weather;

let events = require('./event.js');
let Event = events.Event;



// HELPER FUNCTION HELLSCAPE --------------------


// ---------- get location from google

function getLocation(request, response) {

  let query = request.query.data;

  let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.GEOCODE_API_KEY}`;
  console.log(geocodeUrl);

  superAgent.get(geocodeUrl)
    .then(googleResponse => {

      let formatted_query = googleResponse.body.results[0].formatted_address;
      let longitude = googleResponse.body.results[0].geometry.location.lng;
      let latitude = googleResponse.body.results[0].geometry.location.lat;

      console.log(`Tried to make location ${currentLocation} from search ${query} at ${latitude},${longitude}`);

      currentLocation = new Location(query, formatted_query, latitude, longitude);
      console.log(`Set location to ${currentLocation}`);

      response.send(currentLocation);

    })
    .catch(error => {
      errorHandler(error, request, response)
    });

}

function getWeather(request, response) {

  let query = request.query.data;

  let weatherUrl = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${currentLocation.latitude},${currentLocation.longitude}`;

  console.log(weatherUrl);

  superAgent.get(weatherUrl)
    .then(darkSkyResponse => {

      let darkSkyArr = darkSkyResponse.body.daily.data;


      console.log(darkSkyArr);

      //   const dailyWeather = darkSkyArr.map(day => new Weather(day));
      // take weather for each day and feed into weather constructor

      //   console.log(dailyWeather);

    })
    .catch(error => {
      errorHandler(error, request, response)
    });

}


// ----- error handlr

function errorHandler(error, reqest, response) {
  console.error(error);
  response.status(500).send('errorHandler says: Something went wrong');
}


// --------------- tests

// Location('derpQuery','derpFormatted','234234','q34');
// Weather({summary:'Example daily summary', time: 8287888399});
// Event({url:'someURL', name: {text:'thisname'}, start: {local:[3,4,5,2,24,5]} });

// needed if we're having constructors do their own API calls
// module.exports = {superAgent: superAgent};
