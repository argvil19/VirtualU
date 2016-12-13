const octaverRoutes = require('./octaver');
const quizRoutes = require('./quizzes');

module.exports = (app) => {
  octaverRoutes(app);
  quizRoutes(app);
};
