// Creates the Begin button on the welcome and instructions pages.

var beginBtnDiv = document.createElement('div');
beginBtnDiv.id = "beginBtnDiv";
document.querySelector("#form").appendChild(beginBtnDiv);

var beginBtn = document.createElement('input');
beginBtn.type = "submit";
beginBtn.className = "btn";
beginBtn.id = "beginBtn";
beginBtn.name = "btn";
beginBtn.value = "Begin";
document.querySelector("#beginBtnDiv").appendChild(beginBtn);