const checkAuth = require('../helpers/auth/check-auth');
const getCourses = require('../controllers/courses/get_courses');
const subscribeToCourse = require('../controllers/courses/subscribe');

module.exports = (app) => {
    app.get('/API/courses/', (req, res, next) => {
        getCourses((err, data) => {
            if (err) {
                next(err);
            }

            return res.status(data.status).json(data);
        });
    });

    app.put('/API/user/courses/', checkAuth, (req, res, next) => {
        // Subscribe to course.
        subscribeToCourse({
            courseName: req.body.courseName,
        }, req.user, (err, success) => {
            if (err) {
                return next(err);
            }

            return res.status(success.status).send(success);
        });
    });
};
