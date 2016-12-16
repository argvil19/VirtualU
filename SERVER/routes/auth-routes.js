
/**
  * router for all the auth related requests
  *
  * @author Arpit Goyal
**/

'use strict';

const userController = require('../controllers/user');

module.exports = (app) => {

  app.post('/register', (req, res, next) => {
    userController.register(req, res, next);
  });

  app.post('/login', (req, res, next) => {
    userController.login(req, res, next);
  });
};
