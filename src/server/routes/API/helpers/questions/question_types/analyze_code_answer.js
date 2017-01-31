const parseCode = require('../../../controllers/octave/parse_matlab');

module.exports = (params, cb) => {
    return parseCode(params.input, (err, data) => {
        if (err) {
            return cb(err);
        }
        
        const regex = new RegExp('\\b' + params.answer.replace(/\s/g, '') + '\\b', 'ig');
        return cb(null, regex.test(data.stdout.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s/g, '')));
    });
};
