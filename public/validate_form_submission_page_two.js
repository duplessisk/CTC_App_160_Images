var allCheckBoxes = document.querySelectorAll('.radio__input');
var yesCheckBoxes = document.querySelectorAll('.yes_check_boxes');
var noCheckBoxes = document.querySelectorAll('.no_check_boxes');

var userResponses = [];
console.log("cached answers: " + localStorage.getItem('pageTwoSaved'));

if (localStorage.getItem('pageTwoAlreadyVisited') == null) {
    console.log("page not visited before");
    for (var i = 0; i < 10; i++) {
        userResponses[i] = "null";
    }
} else {
    var userResponsesLocal = localStorage.getItem('pageTwoSaved');
    for (var i = 0; i < userResponsesLocal.length; i++) {
        if (String(userResponsesLocal.charAt(i)) == "t") {
            userResponses[i] = true;
        } else if (String(userResponsesLocal.charAt(i)) == "f") {
            userResponses[i] = false;
        } else {
            userResponses[i] = "null";
        }
    }
}

for (var i = 0; i < userResponses.length; i++) {
    console.log("userResponses: " + userResponses);
    if (userResponses[i] != "null" && userResponses[i]) {
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

document.querySelector('#previousButton').addEventListener('click', function() {
    userResponsesLocal = "";
    localStorage.setItem('pageTwoAlreadyVisited', 1);
    for (var i = 0; i < userResponses.length; i++) {
        if (userResponses[i] == "null") {
            userResponsesLocal += "n";
        } else if (userResponses[i] == true) {
            userResponsesLocal += "t";
        } else {
            userResponsesLocal += "f";
        }
    }
    if (userResponsesLocal.includes("n")) {
        alert("You've left a question unanswered. You can navigate back " + 
        "to this page later and answer the question, however, if you leave it blank on submission "
        + "you will miss the question.");
    }
    localStorage.setItem('pageTwoSaved', userResponsesLocal);
});

document.querySelector('#continueButton').addEventListener('click', function() {
    userResponsesLocal = "";
    localStorage.setItem('pageTwoAlreadyVisited', 1);
    for (var i = 0; i < userResponses.length; i++) {
        if (userResponses[i] == "null") {
            userResponsesLocal += "n";
        } else if (userResponses[i] == true) {
            userResponsesLocal += "t";
        } else {
            userResponsesLocal += "f";
        }
    }
    if (userResponsesLocal.includes("n")) {
        alert("You've left a question unanswered. You can navigate back " + 
        "to this page later and answer the question, however, if you leave it blank on submission "
        + "you will miss the question.");
    }
    localStorage.setItem('pageTwoSaved', userResponsesLocal);
});