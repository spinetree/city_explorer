function Location(query, formatted_query, latitude, longitude) {

  // takes in a search query (just the town name youre' looking for) and makes a location object with the help of the google geocode api
  this.query = query;
  this.created = Date.now();
  this.formatted_query = formatted_query;
  this.latitude = latitude;
  this.longitude = longitude;
}

// Location.prototype.getCoordinates = function(query) {

//   // take in the search query:
//   // console.log('query gotten:' + query);

//   let geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${query}&key=${process.env.GEOCODE_API_KEY}`;
//   // console.log(`geocode url: ${geocodeUrl}`);

//   superAgent.get(geocodeUrl)
//     .then(googleResponse => {
//       // console.log(googleResponse);
//       this.formatted_query = googleResponse.body.results[0].formatted_address;
//       this.longitude = googleResponse.body.results[0].geometry.location.lng;
//       this.latitude = googleResponse.body.results[0].geometry.location.lat;

//       // console.log(`made location ${this.formatted_query} from search ${query} at ${this.latitude},${this.longitude}`);
//       // return this;
//     })

//     .catch(error => {
//       // errorHandler(error, query, '')
//     });

// TODO: THIS WAS 2 HOURS OF WASTE. COULD NOT GET THIS.PROPERTIES TO WRITE THEMSELVES TO THE PARENT OBJECT FROM INSIDE THE PROTOTYPE FUNCTION.
// AND THEN AGREED TO DO IT THE DUMB WAY AND IT'S NOT SO DDUMB. IT WORKS. IT'S BEAUTIFUL. IT HAPPENED IN 5 MINUTES. ILL TAKE THAT DEAL.
// HOUSES ARE BUILD BIG TO SMALL

//   // TODO:
//   // am I in database?
//   // add self to database
// }

module.exports = {
  Location: Location
};


