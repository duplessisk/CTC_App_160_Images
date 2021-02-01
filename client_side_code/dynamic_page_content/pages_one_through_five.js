 /**
 * This script allows for pages 1 through 5 to be dynamic. Specifically,  
 * this script caches the client's responses for this page (this 
 * effectively saves their responses for each page). This is important because
 * the client should be able to navigate away from this page and excpect the 
 * status of the page to be the same should they decide to return to 
 * it in the future.
 */

var allCheckBoxes = document.querySelectorAll('.default-radio-btns');
var cellCheckBoxes = document.querySelectorAll('.cell-check-boxes');
var notCellCheckBoxes = document.querySelectorAll('.not-cell-check-boxes');

// Init array containing all client responses.
var clientResponses = [];

/**
 * Populates the current clientResponses with the client's saved responses 
 * (in cache) on their previous visit to this page. 
 */
if (localStorage.getItem('page' + pageNum + 'AlreadyVisited') == null) {
    for (var i = 0; i < 20; i++) {
        clientResponses[i] = "null";
    }
} else {
    var clientResponsesLocal = localStorage.getItem('page' + pageNum + 'Saved');
    for (var i = 0; i < clientResponsesLocal.length; i++) {
        if (String(clientResponsesLocal.charAt(i)) == "t") {
            clientResponses[i] = true;
        } else if (String(clientResponsesLocal.charAt(i)) == "f") {
            clientResponses[i] = false;
        } else {
            clientResponses[i] = "null";
        }
    }
}

// Checks this page's checkboxes that were checked in the past by the client.
for (var i = 0; i < clientResponses.length; i++) {
    if (clientResponses[i] != "null" && clientResponses[i]) {
        allCheckBoxes[i].checked = true;
    } 
}

/**
 * For each cell check box, records whether or not it has been checked, and 
 * stores that result in clientResponses array.
 */
for (var i = 0; i < cellCheckBoxes.length; i++) {
    cellCheckBoxes[i].addEventListener('change', function() {
        idNum = Number(this.id.charAt(12));
        if (this.checked) {
            clientResponses[2*idNum] = true;
            clientResponses[2*idNum + 1] = false;
        }
    });
}

/**
 * For each not cell check box, records whether or not it has been checked, and 
 * stores that result in clientResponses array.
 */
for (var i = 0; i < notCellCheckBoxes.length; i++) {
    notCellCheckBoxes[i].addEventListener('change', function() {
        idNum = Number(this.id.charAt(11));
        if (this.checked) {
            clientResponses[2*idNum + 1] = true;
            clientResponses[2*idNum] = false;
        }
    });
}

/**
 * Senses whether or not the Previous button on this page has been clicked. 
 * If it has, the client responses for this page are cached.
 * 
 * Also records whether or not a client has left a question on this page 
 * blank.
 */
document.querySelector('#previousBtn').addEventListener('click', function() {
    clientResponsesLocal = "";
    localStorage.setItem('page' + pageNum + 'AlreadyVisited', 1);
    for (var i = 0; i < clientResponses.length; i++) {
        if (clientResponses[i] == "null") {
            clientResponsesLocal += "n";
        } else if (clientResponses[i] == true) {
            clientResponsesLocal += "t";
        } else {
            clientResponsesLocal += "f";
        }
    }
    localStorage.setItem('page' + pageNum + 'Saved', clientResponsesLocal);
});

/**
 * Senses whether or not the Next button on this page has been clicked. 
 * If it has, the client responses for this page are cached. 
 * 
 * Also records whether or not a client has left a question on this page 
 * blank. 
 */
document.querySelector('#nextBtn').addEventListener('click', function() {
    clientResponsesLocal = "";
    localStorage.setItem('page' + pageNum + 'AlreadyVisited', 1);
    for (var i = 0; i < clientResponses.length; i++) {
        if (clientResponses[i] == "null") {
            clientResponsesLocal += "n";
        } else if (clientResponses[i] == true) {
            clientResponsesLocal += "t";
        } else {
            clientResponsesLocal += "f";
        }
    }
    if (clientResponsesLocal.includes("n")) {
        localStorage.setItem('page' + pageNum + 'HasNull', true);
    } else {
        localStorage.setItem('page' + pageNum + 'HasNull', false);
    }
    localStorage.setItem('page' + pageNum + 'Saved', clientResponsesLocal);
});

/**
 * Senses whether or not the Next button on this page has been clicked. 
 * If it has, the client responses for this page are cached. 
 * 
 * Also records whether or not a client has left a question on this page 
 * blank. 
 */
returnToReviewPageBtn.addEventListener('click', function() {
    clientResponsesLocal = "";
    localStorage.setItem('page' + pageNum + 'AlreadyVisited', 1);
    for (var i = 0; i < clientResponses.length; i++) {
        if (clientResponses[i] == "null") {
            clientResponsesLocal += "n";
        } else if (clientResponses[i] == true) {
            clientResponsesLocal += "t";
        } else {
            clientResponsesLocal += "f";
        }
    }
    if (clientResponsesLocal.includes("n")) {
        localStorage.setItem('page' + pageNum + 'HasNull', true);
    } else {
        localStorage.setItem('page' + pageNum + 'HasNull', false);
    }
    localStorage.setItem('page' + pageNum + 'Saved', clientResponsesLocal);
});