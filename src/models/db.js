const mongoose = require('mongoose');

const DB_URI = process.env.NODE_ENV !== 'production'
  ? 'mongodb://localhost:27017/HVU'
  : 'mongodb://hvu:hvuproject@ds139448.mlab.com:39448/hvu';

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
