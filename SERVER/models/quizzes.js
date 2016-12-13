const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
  question: String,
  chapter: Number,
  options: Array,
  answer: Number,
});

const Quiz = mongoose.model('Quizzes', quizSchema);

module.exports = Quiz;
