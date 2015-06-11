$(document).ready(function (){ 
    var socket = io.connect();
   
	console.log("Inside Document.ready");

	var seconds;
	var temp;
	var clickOnce = true;
	var correctAnswer = ""

	socket.on("correctAnswerIs", function(data){
		correctAnswer = data;
		console.log("Inside sockets.js answer: ", correctAnswer);
	})

	// timer
	function countdown() {
		if (clickOnce == true) {
			seconds = document.getElementById('countdown').innerHTML;
			seconds = parseInt(seconds, 10);
	       
			if (seconds == 0) {
				temp = document.getElementById('countdown');
				temp.innerHTML = "0";
				return;
			}
		       
			seconds--;
			temp = document.getElementById('countdown');
			temp.innerHTML = seconds;
			timeoutMyOswego = setTimeout(countdown, 1000);

			if ( seconds == 0 ) {
				//emit to server
				socket.emit("timeIsUp", correctAnswer);
				$(".realAnswer").html(correctAnswer + " is the correct answer!");
			}
		}
	}

	$(document).on("click", ".startQuizButton", function(){
		countdown();
		socket.emit("startButton");
	});

	// click next button to reset desktop and app
	$(document).on("click", ".nextButton", function(){
		$(".realAnswer").html("");
		$(".answerA").html("");
		$(".answerB").html("");
		$(".answerC").html("");
		$(".answerD").html("");
		$("#countdown").html(10);
		clickOnce = true;
	});

	//show results of all users on page
	//show correct answer
	socket.on("finalScores", function(data) {
		clickOnce = false  
		console.log("Final Scores: ", data);
		var sum = 0;
		sum += data.A;
		sum += data.B;
		sum += data.C;
		sum += data.D;
		console.log("Sum: " , sum)
		$(".answerA").html(Math.floor((data.A/sum)*100) + "% chose A");
		$(".answerB").html(Math.floor((data.B/sum)*100) + "% chose B");
		$(".answerC").html(Math.floor((data.C/sum)*100) + "% chose C");
		$(".answerD").html(Math.floor((data.D/sum)*100) + "% chose D");
	})
})