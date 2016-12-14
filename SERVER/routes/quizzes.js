const newQuiz = require('../controllers/quizzes/new_quiz');
const getQuiz = require('../controllers/quizzes/get_quizzes');

module.exports = (app) => {
  app.get('/quiz/get?', (req, res, next) => {
    /* GET Quiz questions
        Params:
        - chapter: INTEGER. Quiz chapter
        - course: STRING. Quiz course.
    */
    if (!req.query.chapter) {
      return next({ message: 'Invalid parameters', status: 400 });
    }

    return getQuiz(parseInt(req.query.chapter, 10), (err, quiz) => {
      if (err) {
        return next(err);
      }

      return res.send(quiz);
    });
  });

  app.post('/quiz/', (req, res, next) => {
    /* Creates a new Quiz question
      Params:
      - quiz: ARRAY. Every quiz item is an object that contains:
        - questionBody: ARRAY. Every questionBody item is an object. Might have a {title} OR {code}.
        - options: ARRAY. Every options item if an object. Contains {optionBody} [hints].
        - answer: INTEGER. Index in options of the answer.
      - chapter: INTEGER. Chapter where it belongs.
      - course: STRING. Course where it belongs.
    */
    newQuiz(req.body.quiz, req.body.course, req.body.chapter, (err, quiz) => {
      if (err) {
        return next(err);
      }

      return res.send(quiz);
    });
  });
};
