function Event(eventObj) {

  this.link = eventObj.url;
  this.name = eventObj.name.text;
  this.event_date = new Date(eventObj.start.local).toString().slice(0,16);
  this.created = Date.now();

  console.log(`made event ${this.name} at ${this.event_date} link:${this.link}`);

}

Event.prototype = {

  // render functions?

}

module.exports = {
  Event: Event
};


