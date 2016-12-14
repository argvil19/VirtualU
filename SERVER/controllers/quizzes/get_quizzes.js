const Quiz = require('../../models/quizzes');

module.exports = (course, chapter, cb) => {
  Quiz.find({ course, chapter: parseInt(chapter, 10) }, { __v: 0 }, (err, quiz) => {
    if (err) {
      return cb({ message: 'DB error', status: 500 });
    }

    return cb(null, { data: quiz });
  });
};
