const Quiz = require('../../models/quizzes');

module.exports = (question, options, answer, chapter, cb) => {
  const chapterInt = parseInt(chapter, 10);
  const answerInt = parseInt(answer, 10);

  if (!(question && chapterInt && options.length && answerInt)) {
    return cb({ message: 'Invalid parameters', status: 400 });
  }

  return Quiz.create({
    question,
    options,
    chapter: chapterInt,
    answer: answerInt,
  }, (err, quiz) => {
    if (err) {
      return cb({ status: 500 });
    }

    return cb(null, { data:quiz });
  });
};
