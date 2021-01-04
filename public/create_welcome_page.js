var beginButtonDiv = document.createElement('div');
beginButtonDiv.id = "beginButtonDiv";
document.querySelector("#form").appendChild(beginButtonDiv);

var beginButton = document.createElement('input');
beginButton.type = "submit";
beginButton.className = "button";
beginButton.id = "beginButton";
beginButton.name = "button";
beginButton.value = "Begin";
document.querySelector("#beginButtonDiv").appendChild(beginButton);