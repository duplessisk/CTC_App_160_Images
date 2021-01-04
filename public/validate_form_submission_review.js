localStorage.setItem("reviewPageVisited",true);

document.querySelector('#previousButtonReviewPage').addEventListener('click', function() {
    var formAlreadySubmitted = localStorage.getItem('formAlreadySubmitted');
    if (formAlreadySubmitted) {
        localStorage.setItem('formCompleted', true);
    } else {
        localStorage.setItem('formAlreadySubmitted', true);
    }
});

document.querySelector('#submitButtonReviewPage').addEventListener('click', function() {
    var formAlreadySubmitted = localStorage.getItem('formAlreadySubmitted');
    if (formAlreadySubmitted) {
        localStorage.setItem('formCompleted', true);
    } else {
        localStorage.setItem('formAlreadySubmitted', true);
    }
});

var reviewMessage = document.createElement('p');
reviewMessage.id = "reviewMessage";
reviewMessage.innerHTML = "You can't submit this form twice, so please go back and review your answers. " +
" Any unanswered questions will be marked as incorrect.";
document.querySelector("#reviewMessageHeaderDiv").appendChild(reviewMessage);

var pageOneHasNull = localStorage.getItem('pageOneHasNull');
var pageTwoHasNull = localStorage.getItem('pageTwoHasNull');

var buffer = document.createElement('div');

if (pageOneHasNull == "true" || pageTwoHasNull == "true") {
    var skippedPages = document.createElement('p');
    skippedPages.id = "skippedPages";
    skippedPages.innerHTML = "You didn't answer questions on the following page(s): ";
    document.querySelector("#reviewMessageResultsDiv").appendChild(skippedPages);
    document.querySelector('#reviewMessageResultsDiv').appendChild(buffer);
}

if (pageOneHasNull == "true") {
    var pageOneNullMessage = document.createElement('a');
    pageOneNullMessage.href = "./page_one";
    pageOneNullMessage.innerHTML = "Page One";
    document.querySelector("#reviewMessageResultsDiv").appendChild(pageOneNullMessage);
    document.querySelector('#reviewMessageResultsDiv').appendChild(buffer);
}

if (pageTwoHasNull == "true") {
    var pageTwoNullMessage = document.createElement('a');
    pageTwoNullMessage.id = "pageTwoNullMessage";
    pageTwoNullMessage.href = "./page_two";
    pageTwoNullMessage.innerHTML = "Page Two";
    document.querySelector("#reviewMessageResultsDiv").appendChild(pageTwoNullMessage);
} 


