$(document).ready(function (){ 
    var socket = io.connect();
    
	var seconds;
	var temp;
	var clickOnce = true;
	var correctAnswer = "D"

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
				socket.emit("timeIsUp", correctAnswer)
				$(".realAnswer").html(correctAnswer + " is the correct answer!");
			}
		}
	}

	$(".startButton").click(function() {
		console.log("here")
		countdown(); // start the timer
		socket.emit("startButton");
	})

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