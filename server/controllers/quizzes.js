var mongoose = require('mongoose');
var Quiz = mongoose.model('Quiz');

module.exports =(function() {
	return {
		add: function(req, res) {
			var new_quiz = new Quiz({title: req.body.title, question: req.body.question, answerA: req.body.answerA, answerB: req.body.answerB, answerC: req.body.answerC, answerD: req.body.answerD});
			new_quiz.save(function(err, response) {
				if(err) {
					console.log('Quiz was not saved in database.');
				}
				else {
					console.log('Quiz was saved into database.');
					res.json(response);
				}
			})
		}
	}
})();