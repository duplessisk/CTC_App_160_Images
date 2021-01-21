document.querySelector('#previousBtnReviewPage').addEventListener('click', function() {
    var formAlreadySubmitted = localStorage.getItem('formAlreadySubmitted');
    if (formAlreadySubmitted) {
        localStorage.setItem('formCompleted', true);
    } else {
        localStorage.setItem('formAlreadySubmitted', true);
    }
});

document.querySelector('#submitBtnReviewPage').addEventListener('click', function() {
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
var pageThreeHasNull = localStorage.getItem('pageThreeHasNull');
var pageFourHasNull = localStorage.getItem('pageFourHasNull');
var pageFiveHasNull = localStorage.getItem('pageFiveHasNull');


var initBuffer = document.createElement('div');
var buffer1 = document.createElement('div');
var buffer2 = document.createElement('div');
var buffer3 = document.createElement('div');
var buffer4 = document.createElement('div');


if (pageOneHasNull == "true" || pageTwoHasNull == "true" ||
    pageThreeHasNull == "true" || pageFourHasNull == "true" || pageFiveHasNull == "true") {
    var skippedPages = document.createElement('p');
    skippedPages.innerHTML = "You didn't answer questions on the following page(s): ";
    document.querySelector("#reviewMessageResultsDiv").appendChild(skippedPages);
    document.querySelector('#reviewMessageResultsDiv').appendChild(initBuffer);
}

if (pageOneHasNull == "true") {
    var pageOneNullMessage = document.createElement('a');
    pageOneNullMessage.href = "./page_one";
    pageOneNullMessage.innerHTML = "Page One";
    document.querySelector("#reviewMessagePagesDiv").appendChild(pageOneNullMessage);
    document.querySelector('#reviewMessagePagesDiv').appendChild(buffer1);
}

if (pageTwoHasNull == "true") {
    var pageTwoNullMessage = document.createElement('a');
    pageTwoNullMessage.href = "./page_two";
    pageTwoNullMessage.innerHTML = "Page Two";
    document.querySelector("#reviewMessagePagesDiv").appendChild(pageTwoNullMessage);
    document.querySelector('#reviewMessagePagesDiv').appendChild(buffer2);
} 

if (pageThreeHasNull == "true") {
    var pageThreeNullMessage = document.createElement('a');
    pageThreeNullMessage.href = "./page_three";
    pageThreeNullMessage.innerHTML = "Page Three";
    document.querySelector("#reviewMessagePagesDiv").appendChild(pageThreeNullMessage);
    document.querySelector('#reviewMessagePagesDiv').appendChild(buffer3);
} 

if (pageFourHasNull == "true") {
    var pageFourNullMessage = document.createElement('a');
    pageFourNullMessage.href = "./page_four";
    pageFourNullMessage.innerHTML = "Page Four";
    document.querySelector("#reviewMessagePagesDiv").appendChild(pageFourNullMessage);
    document.querySelector('#reviewMessagePagesDiv').appendChild(buffer4);
} 

if (pageFiveHasNull == "true") {
    var pageFiveNullMessage = document.createElement('a');
    pageFiveNullMessage.href = "./page_five";
    pageFiveNullMessage.innerHTML = "Page Five";
    document.querySelector("#reviewMessagePagesDiv").appendChild(pageFiveNullMessage);
} 


