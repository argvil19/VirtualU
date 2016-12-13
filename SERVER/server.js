const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./routes/index');
const http = require('http');
const path = require('path');

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serves static files
app.use(express.static(path.join(__dirname, '../VIEWS')));

// Server middlewares
routes(app);

app.listen(3000, (err) => {
  if (err) {
    throw new Error(err.message);
  }

  return console.log('Listening at port 3000');
});

module.exports = app;

if (!module.parent) {
  // Fires if server.js isn't being required from outside. Starts the server.
  http.createServer(app);
}
