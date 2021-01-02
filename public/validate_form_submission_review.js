document.querySelector('#previousButtonReviewPage').addEventListener('click', function() {
    var formAlreadySubmitted = localStorage.getItem('formAlreadySubmitted');
    if (formAlreadySubmitted) {
        alert("This form has been submitted already. You cannot go back and modify " + 
        "the previous results.");
        localStorage.setItem('formCompleted', true);
    } else {
        localStorage.setItem('formAlreadySubmitted', true);
    }
});

document.querySelector('#submitButtonReviewPage').addEventListener('click', function() {
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
reviewMessage.innerHTML = "You can't submit this form twice, so please go back and review your answers. " +
" Any unanswered questions will be marked as incorrect.";
document.querySelector("#reviewMessageHeaderDiv").appendChild(reviewMessage);

var pageOneHasNull = localStorage.getItem('pageOneHasNull');
var pageTwoHasNull = localStorage.getItem('pageTwoHasNull');

var buffer = document.createElement('div');

if (pageOneHasNull == "true") {
    var pageOneNullMessage = document.createElement('a');
    pageOneNullMessage.href = "./";
    pageOneNullMessage.id = "pageOneNullMessage";
    pageOneNullMessage.innerHTML = "page one";
    document.querySelector("#reviewMessageResultsDiv").appendChild(pageOneNullMessage);
    document.querySelector('#reviewMessageResultsDiv').appendChild(buffer);
} 

if (pageTwoHasNull == "true") {
    var pageTwoNullMessage = document.createElement('a');
    pageTwoNullMessage.href = "./page_two";
    pageTwoNullMessage.id = "pageTwoNullMessage";
    pageTwoNullMessage.innerHTML = "page two";
    document.querySelector("#reviewMessageResultsDiv").appendChild(pageTwoNullMessage);
} 


