var previousBtnReviewPageDiv = document.createElement('div');
previousBtnReviewPageDiv.id = "previousBtnReviewPageDiv";
document.querySelector("#form").appendChild(previousBtnReviewPageDiv);

var previousBtnReviewPage = document.createElement('input');
previousBtnReviewPage.type = "submit";
previousBtnReviewPage.className = "btn";
previousBtnReviewPage.id = "previousBtnReviewPage";
previousBtnReviewPage.name = "btn";
previousBtnReviewPage.value = "Previous";
document.querySelector("#previousBtnReviewPageDiv").appendChild(previousBtnReviewPage);

var submitBtnReviewPageDiv = document.createElement('div');
submitBtnReviewPageDiv.id = "submitBtnReviewPageDiv";
submitBtnReviewPageDiv.className = "right-btn";
document.querySelector("#form").appendChild(submitBtnReviewPageDiv);

var submitBtnReviewPage = document.createElement('input');
submitBtnReviewPage.type = "submit";
submitBtnReviewPage.className = "btn";
submitBtnReviewPage.id = "submitBtnReviewPage";
submitBtnReviewPage.name = "btn";
submitBtnReviewPage.value = "Submit";
document.querySelector("#submitBtnReviewPageDiv").appendChild(submitBtnReviewPage);