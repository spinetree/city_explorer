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

app.get('/events', (request,response) => getEvents(request, response) );

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

  superAgent.get(geocodeUrl)
    .then(googleResponse => {

      let formatted_query = googleResponse.body.results[0].formatted_address;
      let longitude = googleResponse.body.results[0].geometry.location.lng;
      let latitude = googleResponse.body.results[0].geometry.location.lat;

      currentLocation = new Location(query, formatted_query, latitude, longitude);

      response.send(currentLocation);

    })
    .catch(error => {
      errorHandler(error, request, response)
    });

}

// ---------- get location from darkSky

function getWeather(request, response) {

  let weatherUrl = `https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${currentLocation.latitude},${currentLocation.longitude}`;

  superAgent.get(weatherUrl)
    .then(darkSkyObj => {

      let localForecast = darkSkyObj.body.daily.data.map(day => new Weather(day));

      response.send(localForecast);

    })
    .catch(error => {
      errorHandler(error, request, response)
    });

}

function getEvents(request, response) {

  let eventBriteUrl = `http://www.eventbriteapi.com/v3/events/search?token=${process.env.EVENTBRITE_PUBLIC_TOKEN}&location.address=${currentLocation.formatted_query}`;

  // console.log(eventBriteUrl);

  superAgent.get(eventBriteUrl)
    .then(eventBriteObj => {

      // loop just the event list and make that an array of events
      let eventsArr = eventBriteObj.body.events.map(eventObj => {
        let event = new Event(eventObj);
        return event;
      }
      )
      // console.log(eventsArr);
      response.send(eventsArr);
    }
    )
    .catch(error => {
      errorHandler(error, request, response)
    });

}

// ----- error handler

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
