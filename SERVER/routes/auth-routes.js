'use strict';

let router = require('express').Router();
let userModel = require('../models/user');

router.post('/register', (req, res, next) => {
  userModel.create(req.body, (err, user) => {
    if(err) res.status(404).send('Username Already Exists!');
    else {
      console.log('User saved:', user);
      res.status(200).send('Registered Successfully!');
    }
  });
});

router.post('/login', (req, res) => {
  console.log('user logging in:', req.body);
});

module.exports = router;
