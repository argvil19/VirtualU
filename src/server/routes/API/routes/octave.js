const parseOctave = require('../controllers/octave/parse_matlab');

module.exports = (app) => {
  app.post('/API/octave/', (req, res, next) => {
    parseOctave({
      code: req.body.code
    }, (err, data) => {
      if (err) {
        return next(err);
      }
      res.status(data.status).send(data);
    });
  });
};
