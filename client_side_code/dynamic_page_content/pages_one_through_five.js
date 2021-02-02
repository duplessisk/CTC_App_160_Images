 /**
 * Allows for pages 1 through 5 to be dynamic. Specifically,  
 * this script caches the client's responses for this page (this 
 * effectively saves their responses for each page). This is important because
 * the client should be able to navigate away from this page and excpect the 
 * status of the page to be the same should they decide to return to 
 * it in the future.
 */
function main() {

    var allCheckboxes = document.querySelectorAll('.default-radio-btns');
    var cellCheckboxes = document.querySelectorAll('.cell-check-boxes');
    var notCellCheckboxes = document.querySelectorAll('.not-cell-check-boxes');
    
    // Init array containing all client responses.
    var pastClientResponses = [];

    populatePastClientResponses(pastClientResponses);

    recheckBoxes(pastClientResponses, allCheckboxes);

    var currentClientResponses = [];

    populateCurrentClientResponses(cellCheckboxes, currentClientResponses, 
        true, false);
    populateCurrentClientResponses(notCellCheckboxes, currentClientResponses, 
        false, true);

    redirectPage("previousButton", currentClientResponses);
    redirectPage("nextButton", currentClientResponses);
    redirectPage("returnButton", currentClientResponses);
    
}
    
main();


/**
 * 
 * Populates the past client responses with the client's cached responses
 * on their previous visit to this page. 
 * @param {Array} pastClientResponses - Contains client's previous responses 
 *                                      for each question.
 */
function populatePastClientResponses(pastClientResponses) {
    if (localStorage.getItem('page' + pageNum + 'AlreadyVisited') == null) {
        for (var i = 0; i < 20; i++) {
            pastClientResponses[i] = "null";
        }
    } else {
        var cachedClientResponses = localStorage.getItem('page' + pageNum + 'Saved');
        for (var i = 0; i < cachedClientResponses.length; i++) {
            if (String(cachedClientResponses.charAt(i)) == "t") {
                pastClientResponses[i] = true;
            } else if (String(cachedClientResponses.charAt(i)) == "f") {
                pastClientResponses[i] = false;
            } else {
                pastClientResponses[i] = "null";
            }
        }
    }
}


/**
 * Checks this page's checkboxes that were checked in the past by the client.
 * @param {Array} pastClientResponses - Contains client's previous responses 
 *                                      for each question.
 */
function recheckBoxes(pastClientResponses, allCheckboxes) {
    // Checks this page's checkboxes that were checked in the past by the client.
    for (var i = 0; i < pastClientResponses.length; i++) {
        if (pastClientResponses[i] != "null" && pastClientResponses[i]) {
            allCheckboxes[i].checked = true;
        } 
    }
}


/**
 * For each check box type (cell or not cell), waits for the checkbox to be 
 * clicked, then records whether or not its been clicked in the current 
 * client responses. 
 * array.
 * @param {Array} checkboxesType - All client responses for the specified 
 *                                 check box type (cell or not cell). 
 * @param {Array} pastClientResponses - Contains client's previous responses 
 *                                      for each question. 
 * @param {Boolean} cellResponse - True if cell checkbox has been selected, 
 *                                 false o.w.
 * @param {Boolean} notCellResponse - True if not cell checkbox has been 
 *                                    selected, false o.w.
 */
function populateCurrentClientResponses(checkboxesType, currentClientResponses,
                            cellResponse, notCellResponse) {
    for (var i = 0; i < checkboxesType.length; i++) {
        checkboxesType[i].addEventListener('change', function() {
            idNum = Number(this.id.charAt(12));
            if (this.checked) {
                currentClientResponses[2*idNum] = cellResponse;
                currentClientResponses[2*idNum + 1] = notCellResponse;
            }
        });
    }
}

/**
 * Senses whether or not the Previous button on this page has been clicked. 
 * If it has, the client responses for this page are cached.
 * 
 * Also records whether or not a client has left a question on this page 
 * blank.
 * @param {Button} button - Button that will listen for a click event 
 * @param {Array} currentClientResponses - Contains client's responses for each 
 *                                  question.
 */
function redirectPage(button, currentClientResponses) {
    document.querySelector('#' + button).addEventListener('click', function() {
        setClientResponsesLocal(currentClientResponses);
    });
}


/**
 * Caches the clients responses so they can be loaded at a later time
 * @param {Array} currentClientResponses - Contains client's responses for each 
 *                                  question. 
 */
function setClientResponsesLocal(currentClientResponses) {
    clientResponsesLocal = "";
    localStorage.setItem('page' + pageNum + 'AlreadyVisited', 1);
    for (var i = 0; i < currentClientResponses.length; i++) {
        if (currentClientResponses[i] == "null") {
            clientResponsesLocal += "n";
        } else if (currentClientResponses[i] == true) {
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
}