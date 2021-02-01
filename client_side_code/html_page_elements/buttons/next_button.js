// Creates the Next button on Pages 1-5

var nextBtnDiv = document.createElement('div');
nextBtnDiv.id = "nextBtnDiv";
nextBtnDiv.className = "right-btn-div";
document.querySelector("#form").appendChild(nextBtnDiv);

var nextBtn = document.createElement('input');
nextBtn.type = "submit";
nextBtn.className = "btn";
nextBtn.id = "nextBtn";
nextBtn.name = "btn";
nextBtn.value = "Next";
document.querySelector("#nextBtnDiv").appendChild(nextBtn);