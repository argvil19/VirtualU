const mongoose = require('mongoose');

const DB_URI = 'mongodb://localhost:27017/HVU';

mongoose.connect(DB_URI);

mongoose.connection.on('connected', () => {
  console.log('Mongoose connection running on 27017');
});

mongoose.connection.on('error', () => {
  console.log('Mongoose connection error');
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongoose connection has been terminated');
});
