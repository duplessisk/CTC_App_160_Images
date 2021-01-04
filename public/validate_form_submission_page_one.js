var allCheckBoxes = document.querySelectorAll('.default-radio-buttons');
var yesCheckBoxes = document.querySelectorAll('.yes_check_boxes');
var noCheckBoxes = document.querySelectorAll('.no_check_boxes');

var userResponses = [];

if (localStorage.getItem('pageOneAlreadyVisited') == null) {
    for (var i = 0; i < 10; i++) {
        userResponses[i] = "null";
    }
} else {
    var userResponsesLocal = localStorage.getItem('pageOneSaved');
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
        allCheckBoxes[i].checked = true;
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
        if (userResponses[i] == "null") {
            userResponsesLocal += "n";
        } else if (userResponses[i] == true) {
            userResponsesLocal += "t";
        } else {
            userResponsesLocal += "f";
        }
    }
    if (userResponsesLocal.includes("n")) {
        localStorage.setItem('pageOneHasNull', true);
    } else {
        localStorage.setItem('pageOneHasNull', false);
    }
    localStorage.setItem('pageOneSaved', userResponsesLocal);
});

var reviewPageVisited = localStorage.getItem('reviewPageVisited');
if (reviewPageVisited == "true") {
    var hyperLinkToReviewPageDiv = document.createElement('div');
    hyperLinkToReviewPageDiv.id = 'hyperLinkToReviewPageDiv';
    document.body.appendChild(hyperLinkToReviewPageDiv);

    var hyperLinkToReviewPage = document.createElement('a');
    hyperLinkToReviewPage.href = "./review";
    hyperLinkToReviewPage.innerHTML = "Return to review page";
    document.querySelector('#hyperLinkToReviewPageDiv').appendChild(hyperLinkToReviewPage);
}