const exec = require('child-process-promise').exec;
const Q = require('q');
const fs = require('fs');
const path = require('path');

function writeToFile(input) {
  return Q.Promise((resolve, reject) => {
    fs.writeFile(path.join(__dirname, '../../../../OCTAVE/user-code.m'), input, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve('Success');
      }
    });
  });
}

module.exports = (params, cb) => {
  const code = params.code || params;

  writeToFile(code).then((result) => {
    if (result === 'Success'){
      // console.log('directory = ' + r);
      // MAC OS PATH:   /usr/local/octave/3.8.0/bin/octave-3.8.0
      exec('octave  -q ' +  process.cwd() + '/src/server/OCTAVE/pizza.m')
        .then((result) => {
          const stdout = result.stdout;
          const stderr = result.stderr;
          const workspace = fs.readFileSync(path.join(__dirname, '../../../../OCTAVE/jsondata'), 'utf-8');

          cb(null, {
            stdout,
            stderr,
            workspace,
            status: 200,
            message: 'Successful parse',
            success: true
          });
        })
        .fail((err) => {
          // TODO: Figure out wtf is going on here?
          // Check for Parse or Excution
          const type = err.message.split('error', 3)[0];

          // console.log('type: ' + type);
          const Command = type.split(':')[1];

          // console.log("Command: ", Command);

          const msg = err.message.split('error', 3);

          if (Command.trim() === 'parse') {

            if (msg[2].trim() === '') {
              return cb({
                message: msg[0].trim(),
                success: false,
                status: 400
              });
            } else {
              return cb({
                message: msg[0].split(':')[0] + ' ' + msg[2],
                success: false,
                status: 400
              });
            }
          } else {
            //Return error on fail
            return cb({
              message: msg[0] + ' ' + msg[1].split(':')[1],
                success: false,
                status: 400
            });
          }
        })
        .done(() => {
          // CLean up wipe file
          writeToFile('').then((result) => {
            if (result === 'Success') {
              console.log('Deleted user-code.m contents');
            }
          });
        });
    }
    return result;
  })
  .catch((err) => {
    return cb({ message: err.message, success: false, status: 500 });
  })
  .done();
};
