const userController = require('../controllers/user');

module.exports = (app) => {
  app.post('/user/', (req, res, next) => {
    /* Register a new user
        Params:
        - username: STRING.
        - password: STRING.
        - email: STRING.
        - name: STRING.
    */
    userController.register({
      username: req.body.username,
      password: req.body.password,
      email: req.body.email,
      name: req.body.name,
    }, (err, user) => {
      if (err) {
        return next(err);
      }

      return res.status(201).send(user);
    });
  });

  app.post('/login/', (req, res, next) => {
    /* Authenticate user. Returns JWT
        Params:
        - username: STRING.
        - password: STRING.
    */
    userController.login({
      username: req.body.username,
      password: req.body.password,
    }, (err, auth) => {
      if (err) {
        return next(err);
      }

      return res.status(200).send(auth);
    });
  });
};
