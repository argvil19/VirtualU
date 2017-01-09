const octaverRoutes = require('./octaver');
const authRoutes = require('./auth-routes');
const userRoutes = require('./users');

module.exports = (app) => {
  octaverRoutes(app);
  authRoutes(app);
  userRoutes(app);
};
