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
    
    var pastClientResponses = [];
    populateClientResponses(pastClientResponses);

    recheckBoxes(pastClientResponses, allCheckboxes);

    var currentClientResponses = [];
    populateClientResponses(currentClientResponses);

    setCurrentClientResponses(cellCheckboxes, "cell", 
        currentClientResponses, true, false);
    setCurrentClientResponses(notCellCheckboxes, "notCell", 
        currentClientResponses,false, true);

    redirectPage("previousBtn", currentClientResponses);
    redirectPage("nextBtn", currentClientResponses);

    reviewPageVisited = localStorage.getItem("reviewPageVisited");

    if (reviewPageVisited) {
        redirectPage("returnToReviewPageBtn", currentClientResponses);
    }  

}
    
main();


/**
 * 
 * Populates the past client responses with the client's cached responses
 * on their previous visit to this page. 
 * @param {Array} clientResponses - Contains client's responses (previous or 
 *                                  current) for each question.
 */
function populateClientResponses(clientResponses) {
    if (localStorage.getItem('page' + pageNum + 'AlreadyVisited') == null) {
        for (var i = 0; i < 20; i++) {
            clientResponses[i] = "null";
        }
    } else {
        var cachedClientResponses = localStorage.getItem('page' + pageNum + 'Saved');
        for (var i = 0; i < cachedClientResponses.length; i++) {
            if (String(cachedClientResponses.charAt(i)) == "t") {
                clientResponses[i] = true;
            } else if (String(cachedClientResponses.charAt(i)) == "f") {
                clientResponses[i] = false;
            } else {
                clientResponses[i] = "null";
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
function setCurrentClientResponses(checkboxesType,checkboxesTypeString,                       
                                        currentClientResponses,cellResponse, 
                                        notCellResponse) {
    for (var i = 0; i < checkboxesType.length; i++) {
        checkboxesType[i].addEventListener('change', function() {
            var idNum;
            if (checkboxesTypeString == "cell") {
                idNum = Number(this.id.charAt(13));
            } else {
                idNum = Number(this.id.charAt(16));
            }
            if (this.checked) {
                currentClientResponses[2*idNum] = cellResponse;
                currentClientResponses[2*idNum + 1] = notCellResponse;
            }
        });
    }
}

/**
 * Senses whether or not the Previous btn on this page has been clicked. 
 * If it has, the client responses for this page are cached.
 * 
 * Also records whether or not a client has left a question on this page 
 * blank.
 * @param {btn} btn - btn that will listen for a click event 
 * @param {Array} currentClientResponses - Contains client's responses for each 
 *                                  question.
 */
function redirectPage(btn, currentClientResponses) {
    document.querySelector('#' + btn).addEventListener('click', function() {
        cacheClientResponses(currentClientResponses);
    });
}


/**
 * Caches the clients responses so they can be loaded at a later time
 * @param {Array} currentClientResponses - Contains client's responses for each 
 *                                  question. 
 */
function cacheClientResponses(currentClientResponses) {
    clientResponsesCached = "";
    localStorage.setItem('page' + pageNum + 'AlreadyVisited', 1);
    for (var i = 0; i < currentClientResponses.length; i++) {
        if (currentClientResponses[i] == "null") {
            clientResponsesCached += "n";
        } else if (currentClientResponses[i] == true) {
            clientResponsesCached += "t";
        } else {
            clientResponsesCached += "f";
        }
    }
    if (clientResponsesCached.includes("n")) {
        localStorage.setItem('page' + pageNum + 'HasNull', true);
    } else {
        localStorage.setItem('page' + pageNum + 'HasNull', false);
    }
    localStorage.setItem('page' + pageNum + 'Saved', clientResponsesCached);
}