// Creates the Previous button on Pages 1-5, and the Review Page.

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