var allCheckBoxes = document.querySelectorAll('.default-radio-btns');
var yesCheckBoxes = document.querySelectorAll('.yes_check_boxes');
var noCheckBoxes = document.querySelectorAll('.no_check_boxes');

var userResponses = [];

if (localStorage.getItem('pageTwoAlreadyVisited') == null) {
    for (var i = 0; i < 20; i++) {
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
    });
}

for (var i = 0; i < noCheckBoxes.length; i++) {
    noCheckBoxes[i].addEventListener('change', function() {
        idNum = Number(this.id.charAt(11));
        if (this.checked) {
            userResponses[2*idNum + 1] = true;
            userResponses[2*idNum] = false;
        }
    });
}

document.querySelector('#previousBtn').addEventListener('click', function() {
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
    localStorage.setItem('pageTwoSaved', userResponsesLocal);
});

document.querySelector('#nextBtn').addEventListener('click', function() {
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
        localStorage.setItem('pageTwoHasNull', true);
    } else {
        localStorage.setItem('pageTwoHasNull', false);
    }
    localStorage.setItem('pageTwoSaved', userResponsesLocal);
});

var returnToReviewPageBtnDiv = document.createElement('div');
returnToReviewPageBtnDiv.id = "returnToReviewPageBtnDiv";
document.querySelector("#form").appendChild(returnToReviewPageBtnDiv);


var returnToReviewPageBtn = document.createElement('button');
returnToReviewPageBtn.type = "submit";
returnToReviewPageBtn.className = "btn";
returnToReviewPageBtn.innerHTML = "Review Page";
returnToReviewPageBtn.id = "returnToReviewPageBtn";
returnToReviewPageBtn.name = "btn";
returnToReviewPageBtn.value = "returnToReviewPage";
var reviewPageVisited = localStorage.getItem('reviewPageAlreadyVisited');

if (reviewPageVisited) {
    document.querySelector("#form").appendChild(returnToReviewPageBtn);
    document.querySelector("#formDiv").classList.add('review');
}