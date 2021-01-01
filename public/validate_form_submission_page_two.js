var allCheckBoxes = document.querySelectorAll('.radio__input');
var yesCheckBoxes = document.querySelectorAll('.yes_check_boxes');
var noCheckBoxes = document.querySelectorAll('.no_check_boxes');

var userResponses = [];
console.log("hello");
if (localStorage.getItem('pageTwoAlreadyVisited') == null) {
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

for (var i = 0; i < userResponses.length; i++) {
    console.log("userResponses: " + userResponses);
    if (userResponses[i]) {
        allCheckBoxes[i].checked = true
    } 
}

for (var i = 0; i < yesCheckBoxes.length; i++) {
    yesCheckBoxes[i].addEventListener('change', function() {
        idNum = Number(this.id.charAt(12));
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

document.querySelector('#submitButton').addEventListener('click', function() {
    userResponsesLocal = "";
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
});

document.querySelector('#submitButton').addEventListener('click', function() {
    console.log("in submit button");
    userResponsesLocal = "";
    localStorage.setItem('pageTwoAlreadyVisited', 1);
    for (var i = 0; i < userResponses.length; i++) {
        if (userResponses[i]) {
             userResponsesLocal += "t";
        } else {
            userResponsesLocal += "f";
        }
    }
    console.log("final UserResponsesLocal: " + userResponsesLocal);
    localStorage.setItem('pageTwoSaved', userResponsesLocal);
});

document.querySelector('#previousButton').addEventListener('click', function() {
    console.log("in previous button");
    userResponsesLocal = "";
    localStorage.setItem('pageTwoAlreadyVisited', 1);
    for (var i = 0; i < userResponses.length; i++) {
        if (userResponses[i]) {
             userResponsesLocal += "t";
        } else {
            userResponsesLocal += "f";
        }
    }
    console.log("final UserResponsesLocal: " + userResponsesLocal);
    localStorage.setItem('pageTwoSaved', userResponsesLocal);
});

