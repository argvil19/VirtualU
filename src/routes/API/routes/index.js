const octaverRoutes = require('./octaver');
const authRoutes = require('./auth-routes');
const userRoutes = require('./users');
const courseRoutes = require('./courses');

module.exports = (app) => {
  octaverRoutes(app);
  authRoutes(app);
  userRoutes(app);
  courseRoutes(app);
};
