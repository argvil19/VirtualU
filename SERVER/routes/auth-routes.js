'use strict';

let router = require('express').Router();
let userModel = require('../models/user');

router.post('/register', (req, res, next) => {
  userModel.create(req.body, (err, user) => {
    if(err) res.status(404).send(err.errmsg);
    console.log('User saved:', user);
  });
});

module.exports = router;
