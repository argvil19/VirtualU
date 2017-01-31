const octaveRoutes = require('./octave');
const authRoutes = require('./auth-routes');
const userRoutes = require('./users');
const courseRoutes = require('./courses');
const navigationRoutes = require('./navigation');
const quizRoutes = require('./quizzes');
const contentRoutes = require('./content');

module.exports = (app) => {
  octaveRoutes(app);
  authRoutes(app);
  userRoutes(app);
  courseRoutes(app);
  navigationRoutes(app);
  quizRoutes(app);
  contentRoutes(app);
};
