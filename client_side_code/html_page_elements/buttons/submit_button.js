// Creates Submit button on the login page and the review page.

var submitBtnDiv = document.createElement('div');
submitBtnDiv.id = "submitBtnDiv";
submitBtnDiv.className = "right-btn-div"
document.querySelector("#form").appendChild(submitBtnDiv);

var submitBtn = document.createElement('input');
submitBtn.type = "submit";
submitBtn.className = "btn";
submitBtn.id = "submitBtn";
submitBtn.name = "btn";
submitBtn.value = "Submit";
document.querySelector("#submitBtnDiv").appendChild(submitBtn);