var beginButtonDiv = document.createElement('div');
beginButtonDiv.id = "beginButtonDiv";
document.querySelector("#form").appendChild(beginButtonDiv);

var understandButton = document.createElement('input');
understandButton.type = "submit";
understandButton.className = "button";
understandButton.id = "understandButton";
understandButton.name = "button";
understandButton.value = "Okay";
document.querySelector("#beginButtonDiv").appendChild(understandButton);