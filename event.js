function Event(eventObj) {

  this.link = eventObj.url;
  this.name = eventObj.name.text;
  this.event_date = new Date(eventObj.start.local).toDateString();
  this.created = Date.now();
  this.summary = eventObj.summary;

  console.log(`made event ${this.name} at ${this.event_date}`);

}

Event.prototype = {

  // render functions?

}

module.exports = {
  Event: Event
};


