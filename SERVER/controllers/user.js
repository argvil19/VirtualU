'use strict';

const userModel = require('../models/user');
const jwtStrategy = require('../middlewares/passport-jwt-strategy');

module.exports.register = (req, res, next) => {
  userModel.create(req.body, (err, user) => {
    if(err) res.status(404).send('Username Already Exists!');
    else {
      console.log('User saved:', user);
      res.status(200).send('Registered Successfully!');
    }
  });
};

module.exports.login = (req, res, next) => {
  userModel.findOne({username: req.body.username}, (err, user) => {
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
};
