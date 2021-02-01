var previousBtnDiv = document.createElement('div');
previousBtnDiv.id = "previousBtnDiv";
document.querySelector("#form").appendChild(previousBtnDiv);

var previousBtn = document.createElement('input');
previousBtn.type = "submit";
previousBtn.className = "btn";
previousBtn.id = "previousBtn";
previousBtn.name = "btn";
previousBtn.value = "Previous";
document.querySelector("#previousBtnDiv").appendChild(previousBtn);

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