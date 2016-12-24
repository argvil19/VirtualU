const octaverRoutes = require('./octaver');
const quizRoutes = require('./quizzes');
const authRoutes = require('./auth-routes');
const userRoutes = require('./users');

module.exports = (app) => {
  octaverRoutes(app);
  quizRoutes(app);
  authRoutes(app);
  userRoutes(app);
};
