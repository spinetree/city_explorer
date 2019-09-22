Pseudo
-------------
- spin up the node app with express, cors, dotenv, superagent, pg

- check if that query is in the database

- if not:
-- send the query to google with a try and catch
-- make that location object (global) by running google's response through a constructor

- If it is in the db (or after):

-- take that location object, use it to generate the api call for eventbrite 
-- get back eventbrite's response
-- run that through constructor function and send the frontend those objects (check frontend code to see what kinda object it wants to get)

- Repeat the same for yelp etc.

## api call functions
- send a query to google
- send a query to yelp
- send a query to eventbrite
- send a query to moviedb

## constructor functions
- a location
- a weather result (see the frontend for the format
- an event result (same ^^)
- (today) a movie result
- (today) a yelp result

## helper functions:
- error handler

## database functions
- write this thing to the database
- check whether this thing's in the database
- run the database schema (reset the database)


