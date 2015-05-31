var mongoose = require('mongoose');
var Quiz = mongoose.model('Quiz');

module.exports =(function() {
	return {
		show: function(req, res) {
			// Return all quizzes created by specified user
			Quiz.find({userID: req.params.id}, function(err, results){
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
			var new_quiz = new Quiz({userID: req.body.userID, title: req.body.title, question: req.body.question, answerA: req.body.answerA, answerB: req.body.answerB, answerC: req.body.answerC, answerD: req.body.answerD, correctAnswer: req.body.correctAnswer, quizCode: req.body.quizCode});
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
					res.json(data[0]);
				}
			})
		},

		updateQuiz: function(req, res) {
			//Check each input value, if not null, update
			if(req.body.title != null){
				Quiz.update({_id: req.params.id}, {title: req.body.title}, function(err, response) {
					//if err else res.json here
				})
			}
			if(req.body.question != null){
				Quiz.update({_id: req.params.id}, {question: req.body.question}, function(err, response) {
					//if err else res.json here
				})
			}
			if(req.body.answerA != null){
				Quiz.update({_id: req.params.id}, {answerA: req.body.answerA}, function(err, response) {
					//if err else res.json here
				})
			}
			if(req.body.answerB != null){
				Quiz.update({_id: req.params.id}, {answerB: req.body.answerB}, function(err, response) {
					//if err else res.json here
				})
			}
			if(req.body.answerC != null){
				Quiz.update({_id: req.params.id}, {answerC: req.body.answerC}, function(err, response) {
					//if err else res.json here
				})
			}
			if(req.body.answerD != null){
				Quiz.update({_id: req.params.id}, {answerD: req.body.answerD}, function(err, response) {
					//if err else res.json here
				})
			}
			if(eq.body.correctAnswer != null){
				Quiz.update({_id: req.params.id}, {correctAnswer: req.body.correctAnswer}, function(err, response) {
					//if err else res.json here
				})
			}
			res.send("Successfully updated");
		}

	}
})();