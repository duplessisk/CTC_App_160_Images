var resetLoginButtonDiv = document.createElement('div');
resetLoginButtonDiv.id = "resetLoginButtonDiv";
document.querySelector("#form").appendChild(resetLoginButtonDiv);

var resetLoginButton = document.createElement('input');
resetLoginButton.type = "submit";
resetLoginButton.className = "button";
resetLoginButton.id = "resetLoginButton";
resetLoginButton.name = "button";
resetLoginButton.value = "Reset";
document.querySelector("#resetLoginButtonDiv").appendChild(resetLoginButton);

var submitLoginButtonDiv = document.createElement('div');
submitLoginButtonDiv.id = "submitLoginButtonDiv";
submitLoginButtonDiv.className = "right-button-div"
document.querySelector("#form").appendChild(submitLoginButtonDiv);

var submitLoginButton = document.createElement('input');
submitLoginButton.type = "submit";
submitLoginButton.className = "button";
submitLoginButton.id = "submitLoginButton";
submitLoginButton.name = "button";
submitLoginButton.value = "Submit";
document.querySelector("#submitLoginButtonDiv").appendChild(submitLoginButton);