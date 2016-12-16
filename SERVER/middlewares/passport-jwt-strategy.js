
/**
  * middleware to setup passport's auth
  * strategies.
  *
  * "passport.authenticate('jwt', {session: false})" <- add this
  *                          parameter in the router.get(url, `here`, requestHandler)
  *                          to make the request secure.
  *
  * @author Arpit Goyal
**/

'use strict';

const passport = require('passport'),
      jwt = require('jsonwebtoken'),
      JwtStrategy = require('passport-jwt').Strategy,
      ExtractJwt = require('passport-jwt').ExtractJwt,
      userModel = require('../models/user');

const JWT_STRATEGY_OPTIONS = {
  jwtFromRequest: ExtractJwt.fromAuthHeader(),
  secretOrKey: 'secret'
};

passport.use(new JwtStrategy(JWT_STRATEGY_OPTIONS,
            (jwt_payload, done) => {
              userModel.findOne({_id: jwt_payload.id}, (err, user) => {
                console.log('passport user', user);
                if(err) return done(err, false);
                if(user) return done(null, user);
                else return done(null, false);
              });
            }));

const createJwtToken = (payload) => jwt.sign(payload, JWT_STRATEGY_OPTIONS.secretOrKey);


module.exports = {
  createJwtToken: createJwtToken
};
