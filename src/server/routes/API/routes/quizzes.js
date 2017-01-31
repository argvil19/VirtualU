const checkAuth = require('../helpers/auth/check-auth');
const getQuizzes = require('../controllers/quizzes/get_quizzes');
const analyzeQuestion = require('../helpers/questions/analyze_questions');

module.exports = (app) => {
    app.get('/API/course/quiz?', checkAuth, (req, res, next) => {
        getQuizzes({
            courseName: req.query.courseName,
            chapter: req.query.chapterName,
            isAssignment: req.query.isAssignment,
        }, req.user, (err, questions) => {
            if (err) {
                return next(err);
            }

            return res.status(questions.status).send(questions);
        });
    });

    app.post('/API/course/quiz/check', checkAuth, (req, res, next) => {
        analyzeQuestion(req.body.questions, (err, answers) => {
            if (err) {
                console.log(err);
                return next(err);
            }
            
            return res.status(answers.status).send(answers);
        });
    });
};
