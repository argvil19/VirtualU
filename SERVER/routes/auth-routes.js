'use strict';

let router = require('express').Router();

router.post('/register', (req, res) => {
  console.log('User received:', req.body);
});

module.exports = router;
