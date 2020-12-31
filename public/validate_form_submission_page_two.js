var allCheckBoxes = document.querySelectorAll('.radio__input');
var yesCheckBoxes = document.querySelectorAll('.yes_check_boxes');
var noCheckBoxes = document.querySelectorAll('.no_check_boxes');

var userResponses = [];

if (localStorage.getItem('pageAlreadyVisited') == null) {
    for (var i = 0; i < 10; i++) {
        userResponses[i] = false;
    }
} else {
    var userResponsesLocal = localStorage.getItem('pageTwoSaved');
    for (var i = 0; i < userResponsesLocal.length; i++) {
        if (String(userResponsesLocal.charAt(i)) == "t") {
            userResponses[i] = true;
        } else {
            userResponses[i] = false;
        }
    }
}

for (var i = 0; i < yesCheckBoxes.length; i++) {
    yesCheckBoxes[i].addEventListener('change', function() {
        idNum = Number(this.id.charAt(12));
        console.log("idNum: " + idNum);
        if (this.checked) {
            userResponses[2*idNum] = true;
            userResponses[2*idNum + 1] = false;
        }
        console.log(userResponses);
    });
}

for (var i = 0; i < noCheckBoxes.length; i++) {
    noCheckBoxes[i].addEventListener('change', function() {
        idNum = Number(this.id.charAt(11));
        if (this.checked) {
            userResponses[2*idNum + 1] = true;
            userResponses[2*idNum] = false;
        }
        console.log(userResponses);
    });
}

function checkBoxes() {
    for (var i = 0; i < userResponses; i++) {
        if (userResponses[i]) {
            allCheckBoxes[i].checked = true
        } 
    }
}

document.querySelector('.button').addEventListener('click', function() {
    userResponsesLocal = "";
    checkBoxes();
    localStorage.setItem('pageAlreadyVisited', 1);
    for (var i = 0; i < userResponses.length; i++) {
        if (userResponses[i]) {
             userResponsesLocal += "t";
        } else {
            userResponsesLocal += "f";
        }
    }
    console.log("final UserResponsesLocal: " + userResponsesLocal);
    localStorage.setItem('pageTwoSaved', userResponsesLocal);
    // document.querySelector("#form").submit();
});