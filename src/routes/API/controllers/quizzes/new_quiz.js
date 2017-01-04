const Quiz = require('../../../../models/Quiz');

module.exports = (quiz, course, chapter, cb) => {
  if (!(quiz.length && chapter && course)) {
    return cb({ message: 'Invalid parameters', status: 400 });
  }

  return Quiz.create({
    quiz,
    chapter,
    course,
  }, (err, newQuiz) => {
    if (err) {
      return cb({ status: 500 });
    }

    return cb(null, { data: newQuiz });
  });
};
