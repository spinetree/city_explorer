function Location(query, formatted_query, longitude, latitude) {

  this.query = query;
  this.formatted_query = formatted_query;
  this.longitude = longitude;
  this.latitude = latitude;
  this.created = Date.now();

  console.log(`made location ${formatted_query} from search ${query} at ${latitude},${longitude}`);

}

Location.prototype = {

  // am I in database?

  // add self to database

}

module.exports = {
  Location: Location
};


