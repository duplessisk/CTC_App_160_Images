// Creates the "Return to Review Page" button on pages 1-5.

var returnToReviewPageBtnDiv = document.createElement('div');
returnToReviewPageBtnDiv.id = "returnToReviewPageBtnDiv";

document.querySelector("#form").appendChild(returnToReviewPageBtnDiv);

var returnToReviewPageBtn = document.createElement('button');
returnToReviewPageBtn.type = "submit";
returnToReviewPageBtn.className = "btn";
returnToReviewPageBtn.innerHTML = "Review Page";
returnToReviewPageBtn.id = "returnToReviewPageBtn";
returnToReviewPageBtn.name = "btn";
returnToReviewPageBtn.value = "returnToReviewPage";

reviewPageVisited = localStorage.getItem("reviewPageVisited");

if (reviewPageVisited) {
    document.querySelector("#form").appendChild(returnToReviewPageBtn);
    document.querySelector("#formDiv").classList.add('review');
}