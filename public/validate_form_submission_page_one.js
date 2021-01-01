var allCheckBoxes = document.querySelectorAll('.radio__input');
var yesCheckBoxes = document.querySelectorAll('.yes_check_boxes');
var noCheckBoxes = document.querySelectorAll('.no_check_boxes');

var userResponses = [];

if (localStorage.getItem('pageOneAlreadyVisited') == null) {
    console.log("page one not visited before");
    for (var i = 0; i < 10; i++) {
        userResponses[i] = false;
    }
} else {
    var userResponsesLocal = localStorage.getItem('pageOneSaved');
    for (var i = 0; i < userResponsesLocal.length; i++) {
        if (String(userResponsesLocal.charAt(i)) == "t") {
            userResponses[i] = true;
        } else {
            userResponses[i] = false;
        }
    }
}

for (var i = 0; i < userResponses.length; i++) {
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

document.querySelector('#nextButton').addEventListener('click', function() {
    userResponsesLocal = "";
    localStorage.setItem('pageOneAlreadyVisited', 1);
    for (var i = 0; i < userResponses.length; i++) {
        if (userResponses[i]) {
            userResponsesLocal += "t";
        } else if (!userResponses[i]) {
            userResponsesLocal += "f";
        } else {
            alert("You can navigate back to this page in the future and finish answering any" + 
            " questions that aren't filled out. Note that any questions left blank will be marked" + 
            " as incorrect");
        }
    }
    console.log("final UserResponsesLocal: " + userResponsesLocal);
    localStorage.setItem('pageOneSaved', userResponsesLocal);
});