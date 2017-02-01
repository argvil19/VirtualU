const parseCode = require('../../../controllers/octave/parse_matlab');

module.exports = (params, cb) => {
    return parseCode(params.input, (err, data) => {
        if (err) {
            return cb(err);
        }
        
        const regex = new RegExp('\\b' + params.answerFromClient.replace(/\s/g, '') + '\\b', 'g');
        return cb(null, regex.test(data.stdout.replace(/(?:\r\n|\r|\n)/g, '').replace(/\s/g, '')));
    });
};
