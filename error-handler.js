function errorHandler(error, reqest, response) {
  console.error(error);
  response.status(500).send('errorHandler says: Something went wrong');
}

module.exports = {errorHandler: errorHandler};
