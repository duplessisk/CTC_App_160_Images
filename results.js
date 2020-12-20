var message = document.querySelector("#numCorrect");
var totalScore = localStorage.getItem("numCorrect");
message.innerHTML = "num correct: " + totalScore;
