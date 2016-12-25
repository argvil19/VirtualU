const User = require('../../../models/User');

module.exports = (userId, cb) => {
  User.find({
    _id: userId,
  }, {
    __v: 0,
    _id: 0,
    quizTaken: 0,
    password: 0,
  }, (err, profile) => {
    if (err) {
      return cb({
        message: 'Internal server error',
        status: 500,
        success: false
      });
    }

    return cb(null, {
      data: profile[0],
      status: 200,
      success: true,
    });
  });
};
