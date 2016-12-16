const octaverRoutes = require('./octaver');
const quizRoutes = require('./quizzes');
const authRoutes = require('./auth-routes');

module.exports = (app) => {
  octaverRoutes(app);
  quizRoutes(app);
	authRoutes(app);
};
