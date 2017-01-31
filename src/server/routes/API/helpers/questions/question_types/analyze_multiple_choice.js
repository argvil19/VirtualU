'use strict';

module.exports = (params) => {
    if (!(Array.isArray(params.input) && Array.isArray(params.answer))) {
        return false;
    }

    let correct = 0;

    params.input.forEach((inputItem) => {
        params.answer.forEach((answerItem) => {
            inputItem === answerItem? correct++ : false;
        });
    });

    if (correct === params.answer.length) {
        return true;
    }

    return false;
};
