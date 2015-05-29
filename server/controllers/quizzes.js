var mongoose = require('mongoose');
var Quiz = mongoose.model('Quiz');

module.exports =(function() {
	return {
		show: function(req, res) {
			//right now, pulling ALL quizzes, regardless of user
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
			var new_quiz = new Quiz({title: req.body.title, question: req.body.question, answerA: req.body.answerA, answerB: req.body.answerB, answerC: req.body.answerC, answerD: req.body.answerD, quizCode: req.body.quizCode});
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
					console.log(err);
				} else {
					console.log(data);
					res.json(data[0]);
				}
			})
		},

		updateQuiz: function(req, res) {
			Quiz.update({question: req.body.question, answerA: req.body.answerA, answerB: req.body.answerB, answerC: req.body.answerC, answerD: req.body.answerD}, function(err, response) {
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