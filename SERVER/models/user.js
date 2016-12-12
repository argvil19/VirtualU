/**
* @author Arpit Goyal
**/

'use strict';

let mongoose = require('mongoose');

let userSchema = mongoose.Schema({
  name: {type: String, required: true},
  username: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  emailId: {type: String, required: true}
});

let userModel = mongoose.model('user', userSchema);

/**
* Dummy admin user to login for developers.
**/
let admin = new userModel({
  name: 'Admin',
  username: 'admin',
  password: '123',
  emailId: 'admin@gmail.com'
});

userModel.find({username: 'admin'}, (err, user) => {
  if(!err && !user.length){
    admin.save((err) => {
      if(err) return console.log(err.errmsg);
    });
  }
});

module.exports = userModel;
