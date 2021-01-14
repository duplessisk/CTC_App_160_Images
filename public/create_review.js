var previousButtonReviewPageDiv = document.createElement('div');
previousButtonReviewPageDiv.id = "previousButtonReviewPageDiv";
document.querySelector("#form").appendChild(previousButtonReviewPageDiv);

var previousButtonReviewPage = document.createElement('input');
previousButtonReviewPage.type = "submit";
previousButtonReviewPage.className = "button";
previousButtonReviewPage.id = "previousButtonReviewPage";
previousButtonReviewPage.name = "button";
previousButtonReviewPage.value = "Previous";
document.querySelector("#previousButtonReviewPageDiv").appendChild(previousButtonReviewPage);

var submitButtonReviewPageDiv = document.createElement('div');
submitButtonReviewPageDiv.id = "submitButtonReviewPageDiv";
submitButtonReviewPageDiv.className = "right-button";
document.querySelector("#form").appendChild(submitButtonReviewPageDiv);

var submitButtonReviewPage = document.createElement('input');
submitButtonReviewPage.type = "submit";
submitButtonReviewPage.className = "button";
submitButtonReviewPage.id = "submitButtonReviewPage";
submitButtonReviewPage.name = "button";
submitButtonReviewPage.value = "Submit";
document.querySelector("#submitButtonReviewPageDiv").appendChild(submitButtonReviewPage);