'use strict';

const router = require('express').Router();
const userModel = require('../models/user');

const jwtStrategy = require('../middlewares/passport-jwt-strategy');

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
console.log(req.body);
  userModel.findOne({username: req.body.username}, (err, user) => {
    console.log('user', user);
    if(err || !user){
      res.status(401).send({message:"Username does\'nt exists!"});
    }else {
      if(req.body.password === user.password){
        let payload = {id: user.id};
        let token = jwtStrategy.createJwtToken(payload);
        res.status(200).send({message: "Login Successfull", token: token});
      }
      else res.status(401).send({message: 'Username/Password did\'nt match'});
    }
  });

});



module.exports = router;
