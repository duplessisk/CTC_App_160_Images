function main() {

    document.getElementById("previousBtnDiv").classList.add('review');

    localStorage.setItem('reviewPageVisited', true);

    redirectPage('previousBtn');
    redirectPage('previousBtn');


}

main();

/**
 * 
 * @param {*} btn 
 */
function redirectPage(btn) {
    document.querySelector('#' + btn).addEventListener('click', function() {
        var formAlreadySubmitted = localStorage.getItem('formAlreadySubmitted');
        if (formAlreadySubmitted) {
            localStorage.setItem('formCompleted', true);
        } else {
            localStorage.setItem('formAlreadySubmitted', true);
        }
    });
}


document.querySelector('#previousBtn').addEventListener('click', function() {
    var formAlreadySubmitted = localStorage.getItem('formAlreadySubmitted');
    if (formAlreadySubmitted) {
        localStorage.setItem('formCompleted', true);
    } else {
        localStorage.setItem('formAlreadySubmitted', true);
    }
});

document.querySelector('#submitBtn').addEventListener('click', function() {
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

if (pageOneHasNull == "true" || pageTwoHasNull == "true" ||
    pageThreeHasNull == "true" || pageFourHasNull == "true" || pageFiveHasNull == "true") {
    var skippedPages = document.createElement('p');
    skippedPages.innerHTML = "You didn't answer questions on the following page(s): ";
    skippedPages.className = "review-page-messages";
    document.querySelector("#reviewMessageResultsDiv").appendChild(skippedPages);
}

if (pageOneHasNull == "true") {
    var pageOneNullbtn = document.createElement('button');
    pageOneNullbtn.innerHTML = "Page One";
    pageOneNullbtn.className = "null-btns";
    pageOneNullbtn.name = "btn";
    pageOneNullbtn.value = "pageOneNull";
    pageOneNullbtn.type = "submit";
    document.querySelector("#nullPagesDiv").appendChild(pageOneNullbtn);
}

if (pageTwoHasNull == "true") {
    var pageTwoNullbtn = document.createElement('button');
    pageTwoNullbtn.innerHTML = "Page Two";
    pageTwoNullbtn.className = "null-btns";
    pageTwoNullbtn.type = "submit";
    pageTwoNullbtn.name = "btn";
    pageTwoNullbtn.value = "pageTwoNull";
    var linebreak = document.createElement('br');
    document.querySelector("#nullPagesDiv").appendChild(linebreak);
    document.querySelector("#nullPagesDiv").appendChild(pageTwoNullbtn);
} 

if (pageThreeHasNull == "true") {
    var pageThreeNullbtn = document.createElement('button');
    pageThreeNullbtn.innerHTML = "Page Three";
    pageThreeNullbtn.className = "null-btns";
    pageThreeNullbtn.type = "submit";
    pageThreeNullbtn.name = "btn";
    pageThreeNullbtn.value = "pageThreeNull";
    var linebreak = document.createElement('br');
    document.querySelector("#nullPagesDiv").appendChild(linebreak);
    document.querySelector("#nullPagesDiv").appendChild(pageThreeNullbtn);
} 

if (pageFourHasNull == "true") {
    var pageFourNullbtn = document.createElement('button');
    pageFourNullbtn.innerHTML = "Page Four";
    pageFourNullbtn.className = "null-btns";
    pageFourNullbtn.type = "submit";
    pageFourNullbtn.name = "btn";
    pageFourNullbtn.value = "pageFourNull";
    var linebreak = document.createElement('br');
    document.querySelector("#nullPagesDiv").appendChild(linebreak);
    document.querySelector("#nullPagesDiv").appendChild(pageFourNullbtn);
} 

if (pageFiveHasNull == "true") {
    var pageFiveNullbtn = document.createElement('button');
    pageFiveNullbtn.innerHTML = "Page Five";
    pageFiveNullbtn.className = "null-btns";
    pageFiveNullbtn.type = "submit";
    pageFiveNullbtn.name = "btn";
    pageFiveNullbtn.value = "pageFiveNull";
    var linebreak = document.createElement('br');
    document.querySelector("#nullPagesDiv").appendChild(linebreak);
    document.querySelector("#nullPagesDiv").appendChild(pageFiveNullbtn);
} 

var nullBtns = document.querySelectorAll('.null-btns');
var form = document.querySelector("#formDiv");