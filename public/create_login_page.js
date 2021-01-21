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

var submitLoginBtnDiv = document.createElement('div');
submitLoginBtnDiv.id = "submitLoginBtnDiv";
submitLoginBtnDiv.className = "right-btn-div"
document.querySelector("#form").appendChild(submitLoginBtnDiv);

var submitLoginBtn = document.createElement('input');
submitLoginBtn.type = "submit";
submitLoginBtn.className = "btn";
submitLoginBtn.id = "submitLoginBtn";
submitLoginBtn.name = "btn";
submitLoginBtn.value = "Submit";
document.querySelector("#submitLoginBtnDiv").appendChild(submitLoginBtn);