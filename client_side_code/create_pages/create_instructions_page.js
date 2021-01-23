var beginBtnDiv = document.createElement('div');
beginBtnDiv.id = "beginBtnDiv";
document.querySelector("#form").appendChild(beginBtnDiv);

var understandBtn = document.createElement('input');
understandBtn.type = "submit";
understandBtn.className = "btn";
understandBtn.id = "understandBtn";
understandBtn.name = "btn";
understandBtn.value = "Next";
document.querySelector("#beginBtnDiv").appendChild(understandBtn);