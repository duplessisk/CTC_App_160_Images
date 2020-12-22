var message = document.querySelector("#numCorrect");
var totalScore = localStorage.getItem("numCorrect");
message.innerHTML = "num correct: " + totalScore;

document.querySelector('.returnbutton').addEventListener('click', function() {
    window.document.location = "image_test.html";
});
