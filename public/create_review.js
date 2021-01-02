var previousButtonDiv = document.createElement('div');
previousButtonDiv.id = "previousButtonDiv";
document.querySelector("#form").appendChild(previousButtonDiv);

var previousButton = document.createElement('input');
previousButton.type = "submit";
previousButton.className = "button";
previousButton.id = "previousButton";
previousButton.name = "button";
previousButton.value = "Previous";
document.querySelector("#previousButtonDiv").appendChild(previousButton);

var submitButtonDiv = document.createElement('div');
submitButtonDiv.id = "submitButtonDiv";
document.querySelector("#form").appendChild(submitButtonDiv);

var submitButton = document.createElement('input');
submitButton.type = "submit";
submitButton.className = "button";
submitButton.id = "submitButton";
submitButton.name = "button";
submitButton.value = "Submit";
document.querySelector("#submitButtonDiv").appendChild(submitButton);
