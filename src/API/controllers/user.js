/* eslint-disable no-underscore-dangle */

const userModel = require('../../models/user');
const jwt = require('../helpers/auth/jwt');
const bcrypt = require('bcrypt-nodejs'); // bcrypt for password encryptation

module.exports.register = (newUser, cb) => {
  // Register a new user
  const username = newUser.username;
  const password = newUser.password;
  const name = newUser.name;
  const email = newUser.email;

  if (!(username && password && name && email)) {
    return cb({ message: 'Missing required parameters', status: 400 });
  }

  return userModel.create({
    username,
    name,
    email,
    password: bcrypt.hashSync(password, bcrypt.genSaltSync(10)), // Encrypt password with bcrypt
  }, (err, user) => {
    if (err) {
      return cb({ message: 'User already exists', status: 409 });
    }

    // Creates JWT.

    const payload = { id: user._id };
    const token = jwt.createJwtToken(payload);

    return cb(null, {
      token,
      message: 'User successfully created',
    });
  });
};

module.exports.login = (userLogin, cb) => {
  // Authentication
  const username = userLogin.username;
  const password = userLogin.password;

  if (!(username && password)) {
    return cb({ message: 'Missing required parameters', status: 400 });
  }

  return userModel.findOne({ username }, (err, user) => {
    if (err || !user) {
      return cb({ message: 'Username doesn\'t exist', status: 404 });
    }

    if (bcrypt.compareSync(password, user.password)) {
      // Creates and send JWT if password matches
      const payload = { id: user._id };
      const token = jwt.createJwtToken(payload);

      return cb(null, {
        token,
        message: 'Sucessful login',
      });
    }

    return cb({ message: 'Incorrect password', status: 401 });
  });
};
