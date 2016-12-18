const mongoose = require('mongoose');

const quizSchema = mongoose.Schema({
  quiz: Array,
  chapter: Number,
  course: String,
});

const Quiz = mongoose.model('quizzes', quizSchema);

module.exports = Quiz;
