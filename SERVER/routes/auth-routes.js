'use strict';

let router = require('express').Router();
let userModel = require('../models/user');

let JwtStrategy = require('passport-jwt').Strategy,
    ExtractJwt = require('passport-jwt').ExtractJwt,
    passport = require('passport'),
    jwt = require('jsonwebtoken');

const JWT_STATEGY_OPTIONS = {jwtFromRequest: ExtractJwt.fromAuthHeader(), secretOrKey: 'secret'};

passport.use(new JwtStrategy(JWT_STATEGY_OPTIONS,
            (jwt_payload, done) => {
              userModel.findOne({id: jwt_payload.sub}, (err, user) => {
                if(err) return done(err, false);
                if(user) return done(null, user);
                else return done(null, false);
              });
            }));

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
        let token = jwt.sign(payload, JWT_STATEGY_OPTIONS.secretOrKey);
        res.status(200).send({message: "Login Successfull", token: token});
      }
      else res.status(401).send({message: 'Username/Password did\'nt match'});
    }
  });

});



module.exports = router;
