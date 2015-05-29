var mongoose = require('mongoose');
var Quiz = mongoose.model('Quiz');

module.exports =(function() {
	return {
		show: function(req, res) {
			Quiz.find({}, function(err, results){
				if(err)
				{
					console.log('Quizzes did not load.');
				}
				else
				{
					console.log("Quizzes loaded!")
					res.json(results);
				}
			})
		},

		add: function(req, res) {
			var new_quiz = new Quiz({title: req.body.title, question: req.body.question, answerA: req.body.answerA, answerB: req.body.answerB, answerC: req.body.answerC, answerD: req.body.answerD, correctAnswer: req.body.correctAnswer, quizCode: req.body.quizCode});
			new_quiz.save(function(err, response) {
				if(err) {
					console.log('Quiz was not saved in database.');
				}
				else {
					console.log('Quiz was saved into database.');
					res.json(response);
				}
			})
		},

		remove: function(req, res) {
			Quiz.remove({_id: req.body._id}, function(err, response) {
				if(err) {
					console.log('Quiz was not deleted.');
				}
				else {
					res.json(response);
				}
			})
		},

		getOneQuiz: function(req, res){
			Quiz.find({_id: req.params.id}, function(err, data){
				if(err)
				{
					console.log("Quiz was not grabbed from the database.");
				} else {
					console.log(data);
					res.json(data);
				}
			})
		},

		updateQuiz: function(req, res) {
			console.log(req.params.id);
			Quiz.update({title: req.body.title, question: req.body.question, answerA: req.body.answerA, answerB: req.body.answerB, answerC: req.body.answerC, answerD: req.body.answerD, correctAnswer: req.body.correctAnswer}, function(err, response) {
				if(err) {
					console.log("Quiz was not updated in database.");
				}
				else {
					console.log("Quiz updated successfully!");
					res.json(response);
				}
			})
		}

	}
})();