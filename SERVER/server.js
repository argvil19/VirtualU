const express = require('express');
const bodyParser = require('body-parser');
const logger = require('morgan');
const routes = require('./routes/index');
const http = require('http');
const path = require('path');
const db = require('./models/db'); // eslint-disable-line no-unused-vars

const app = express();

app.use(logger('dev'));

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Serves static files
app.use(express.static(path.join(__dirname, '../VIEWS')));

// Server middlewares
routes(app);

// Error middleware
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
  if (err.status === 500) {
    return res.sendStatus(500);
  }

  return res.status(err.status).send({ message: err.message });
});

app.listen(3000, (err) => {
  if (err) {
    throw new Error(err.message);
  }

  return console.log('Listening at port 3000'); // eslint-disable-line no-console
});

module.exports = app;

if (!module.parent) {
  // Fires if server.js isn't being required from outside. Starts the server.
  http.createServer(app);
}
