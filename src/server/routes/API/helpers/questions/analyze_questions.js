const keystone = require('keystone');
const async = require('async');
const Question = keystone.list('Question');
const analyzeShortAnswer = require('./question_types/analyze_short_answer');
const analyzeMultipleSelect = require('./question_types/analyze_multiple_select');
const analyzeMultipleChoice = require('./question_types/analyze_multiple_choice');
const analyzeCodeAnswer = require('./question_types/analyze_code_answer');

module.exports = (questions, cb) => {
    if (!Array.isArray(questions)) {
        return cb({
            message: 'questions param is required to be an Array',
            status: 400,
            success: false
        });
    }
    
    const questionsId = questions.map(item => item.questionId);
    const answers = [...questions];
    
    Question.model.find({
        _id: {
            $in: questionsId
        }
    }, {
        __v: 0
    }, (err, result) => {
        if (err) {
            return cb(err);
        } else if (!result) {
            return cb({
                message: 'Those questions does not exist',
                status: 400,
                success: false
            });
        } else if (result.length !== questions.length) {
            return cb({
                message: 'Answers received does not match with the expected number of results',
                status: 400,
                success: false
            });
        }
        
        async.eachOf(questions, (question, index, done) => {
            async.eachOf(result, (answer, indexAnswer, doneAnswer) => {

                let error;

                if (question.questionId === answer._id.toString()) {
                    switch (question.questionType) {
                        case 'short answer':
                            if (analyzeShortAnswer({
                                input: question.answer,
                                answer: answer.questionAnswer
                            })) {
                                answers[index].isCorrect = true;
                            } else {
                                answers[index].isCorrect = false;
                            }
                            doneAnswer(error);
                            break;

                        case 'multiple select':
                            if (analyzeMultipleSelect({
                                input: question.answer,
                                answer: answer.correctAnswerSelect
                            })) {
                                answers[index].isCorrect = true;
                            } else {
                                answers[index].isCorrect = false;
                            }
                            doneAnswer(error);
                            break;

                        case 'multiple choice':
                            if (analyzeMultipleChoice({
                                input: question.answer,
                                answer: answer.correctAnswerChoice
                            })) {
                                answers[index].isCorrect = true;
                            } else {
                                answers[index].isCorrect = false;
                            }
                            doneAnswer(error);
                            break;
                        case 'coding':
                            analyzeCodeAnswer({
                                input: question.answer,
                                answer: answer.expectedResult[0],
                                answerFromClient: question.answerFromClient
                            }, (err, result) => {
                                if (err) {
                                    error = err;
                                }
                                if (result) {
                                    answers[index].isCorrect = true;
                                } else {
                                    answers[index].isCorrect = false;
                                }
                                answers[index].lastAnswer = question.answerFromClient;
                                return doneAnswer(error);
                            });
                            break;
                    }
                    answers[index] = Object.assign({}, answer._doc, answers[index]);
                } else {
                    doneAnswer();
                }
            }, (err) => {
                done(err);
            });
        }, (err) => {
            if (err) {
                return cb({
                    message: 'Error while parsing answers',
                    status: 500,
                    success: false
                });
            }
            
            return cb(null, {
                data: answers,
                status: 200,
                success: true
            });
        });
    });
};
