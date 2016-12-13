const newQuiz = require('../controllers/quizzes/new_quiz');
const getQuiz = require('../controllers/quizzes/get_quizzes');

module.exports = (app) => {
  app.get('/quiz/get?', (req, res, next) => {
    /* GET Quiz questions
        Params:
        - chapter: INTEGER. Quiz chapter
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
      - question: STRING. Question name.
      - options: ARRAY. Quizz options.
      - answer: INTEGER. Index in options of the answer.
      - chapter: INTEGER. Chapter where this quiz belongs.
    */
    newQuiz(req.body.question, req.body.options, req.body.answer, req.body.chapter, (err, quiz) => {
      if (err) {
        return next(err);
      }

      return res.send(quiz);
    });
  });
};
