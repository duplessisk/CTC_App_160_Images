document.querySelector('#previousButton').addEventListener('click', function() {
    var formAlreadySubmitted = localStorage.getItem('formAlreadySubmitted');
    if (formAlreadySubmitted) {
        alert("This form has been submitted already. You cannot go back and modify " + 
        "the previous results.");
        localStorage.setItem('formCompleted', true);
    } else {
        localStorage.setItem('formAlreadySubmitted', true);
    }
});

document.querySelector('#submitButton').addEventListener('click', function() {
    var formAlreadySubmitted = localStorage.getItem('formAlreadySubmitted');
    if (formAlreadySubmitted) {
        alert("This form has been submitted already. Therefore, no modifications " + 
        "can be made to previous results.");
        localStorage.setItem('formCompleted', true);
    } else {
        localStorage.setItem('formAlreadySubmitted', true);
    }
});

var reviewMessage = document.createElement('p');
reviewMessage.id = reviewMessage;
reviewMessage.innerHTML = "Please go back and review your answers. Any unanswered questions will be marked " + 
"as incorrect.";
document.querySelector("#reviewMessageDiv").appendChild(reviewMessage);