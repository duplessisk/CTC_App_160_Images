// Creates the Reset button on the login info page.

var resetLoginBtnDiv = document.createElement('div');
resetLoginBtnDiv.id = "resetLoginBtnDiv";
document.querySelector("#form").appendChild(resetLoginBtnDiv);

var resetLoginBtn = document.createElement('input');
resetLoginBtn.type = "reset";
resetLoginBtn.className = "btn";
resetLoginBtn.id = "resetLoginBtn";
resetLoginBtn.name = "btn";
resetLoginBtn.value = "Reset";
document.querySelector("#resetLoginBtnDiv").appendChild(resetLoginBtn);