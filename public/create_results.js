// init pageHeader
pageHeaderDiv = document.createElement('div');
pageHeaderDiv.id = "pageHeaderDiv";
document.body.appendChild(pageHeaderDiv);
overallResults = document.createElement('div');
overallResults.id = "overallResults";
document.querySelector("#pageHeaderDiv").appendChild(overallResults);
document.body.appendChild(pageHeaderDiv);
document.querySelector("#pageHeaderDiv").appendChild(overallResults);

// buffer to allow for gap between pageHeader and rest of page 
bufferDiv = document.createElement('div');
bufferDiv.id = "bufferDiv";
document.body.appendChild(bufferDiv);

// create results DIV for each different cell type  
var tempTypes = ["A","B","C","D","E"];
for (var i = 0; i < 5; i++) {
    // typeHeader DIVs
    typeHeaderDiv = document.createElement('div');
    typeHeaderDiv.className = "header-divs"
    typeHeaderDiv.id = "type"+tempTypes[i]+"HeaderDiv";
    document.body.appendChild(typeHeaderDiv);
    // typeResult DIVs
    var typeResultsDiv = document.createElement('div');
    typeResultsDiv.id = "type"+tempTypes[i]+"ResultDiv";
    typeResultsDiv.className = "types";
    document.body.appendChild(typeResultsDiv);
    // typeLabel
    var typeLabel = document.createElement('p');
    typeLabel.innerHTML = "Type "+tempTypes[i]+" Cell Results";
    typeLabel.className = "label-types";
    document.getElementById("type"+tempTypes[i]+"HeaderDiv").appendChild(typeLabel);
    // line breaks
    if (i < 4) {
        var lineBreaks = document.createElement('hr');
        lineBreaks.className = "line-breaks";
        document.body.append(lineBreaks);
    }
}

var cellTypes = ['A','B','C','D','E'];

// Stores image paths of all incorrect user answers in the appropriate cell type bin
var incorrectTypesMap = new Map([['A', []], ['B', []], ['C', []], ['D', []], ['E', []]]);

/**
 * Main function that reads in JSON files, and links the data with the DOM.
 */
async function main() {
    for (var i = 0; i < cellTypes.length; i++) {
        incorrectTypesMap.set(cellTypes[i], await fetch("/static/incorrect_image_paths_" + cellTypes[i] + ".json"));
        incorrectTypesMap.set(cellTypes[i], await incorrectTypesMap.get(cellTypes[i]).text());
        incorrectTypesMap.set(cellTypes[i], getJsonContents(incorrectTypesMap.get(cellTypes[i])));
    }
    createButtons();
    querySelectButtons();
}

/**
 * Returns an array containing the data from the specified JSON file
 * @param {Promise} incorrectTypeBlocks - Promise object that needs to be parsed in order to obtain data
 */
function getJsonContents(incorrectTypeBlocks) {
    var imagePathStrings = "";
    for (let i in incorrectTypeBlocks) {
        let t = incorrectTypeBlocks[i];
        if (t != '{') {
            imagePathStrings += t;
        }
    } 
    var jsonObjectArr = imagePathStrings.split("}");
    for (var i = 0; i < jsonObjectArr.length; i++) {
        jsonObjectArr[i] = jsonObjectArr[i].substring(19);
    }
    return jsonObjectArr;
}

/**
 * Adds incorrect cell images to DOM
 * @param {Array} cellType - Stores all the cell type bins
 * @param {Array} incorrectTypeArr - Contains the paths of all incorrectly answered images based on cell type
 */
function addMissedImagesToDom(cellType, incorrectTypeArr) {
    if (incorrectTypeArr.length - 1 != 0) {
        for (var i = 0; i < incorrectTypeArr.length-1; i++) {
            var imageNum = incorrectTypeArr[i].substring(25,27);
            var messageDiv = document.createElement('div');
            messageDiv.className = "message-div";
            messageDiv.id = "messageDiv";
            messageDiv.innerHTML = "You got image  " + imageNum + " incorrect";
            document.querySelector("#type" + cellType + "ResultDiv").appendChild(messageDiv);
            var missedImagePath = incorrectTypeArr[i].substring(0,37);
            var newImg = document.createElement('img');
            newImg.id="resultsImg";
            newImg.src = missedImagePath;
            document.querySelector("#type" + cellType + "ResultDiv").appendChild(newImg);
        }
    }
}

/**
 * Creates button elements and adds them to the DOM
 */
function createButtons() {
    for (var i = 0; i < 5; i++) {
        var typeButtonDiv = document.createElement('span');
        typeButtonDiv.className = "type-button-divs";
        typeButtonDiv.id = "type"+tempTypes[i]+"ButtonDiv";
        document.querySelector("#type"+tempTypes[i]+"HeaderDiv").appendChild(typeButtonDiv);
        var typeButton = document.createElement('button');
        typeButton.innerHTML = "Show Missed";
        typeButton.id = "type"+tempTypes[i]+"Button";
        typeButton.className = "show-type-button";
        document.querySelector("#type"+tempTypes[i]+"ButtonDiv").appendChild(typeButton);

        var showAllTypeButtonDiv = document.createElement('span');
        showAllTypeButtonDiv.className = "show-all-type-button-divs";
        showAllTypeButtonDiv.id = "showAllType"+tempTypes[i]+"ButtonDiv";
        document.querySelector("#type"+tempTypes[i]+"HeaderDiv").appendChild(showAllTypeButtonDiv);
        var showAllTypeButton = document.createElement('button');
        showAllTypeButton.innerHTML = "Show All";
        showAllTypeButton.id = "showAllType"+tempTypes[i]+"Button";
        showAllTypeButton.className = "show-all-type-button";
        document.querySelector("#showAllType"+tempTypes[i]+"ButtonDiv").appendChild(showAllTypeButton);
    }
}

// Stores whether or not a particular show button has been clicked (false) or not (true)
var showButtonsClickNumMap = new Map([['A', true], ['B', true], ['C', true], ['D', true], ['E', true]]);

// Stores whether or not a particular show all button has been clicked (false) or not (true)
var showAllButtonsClickNumMap = new Map([['A', true], ['B', true], ['C', true], ['D', true], ['E', true]]);

/**
 * Adds an event listener to all of the show and show all buttons. Contains code allowing for the dynamic content of 
 * these buttons
 */
function querySelectButtons() {
    for (var i = 0; i < 5; i++) {
        document.querySelectorAll(".show-type-button")[i].addEventListener('click', function() {
            var cellType = this.id.charAt(4);
            if (showButtonsClickNumMap.get(cellType)) { // show images for show button
                document.getElementById("type"+cellType+"Button").innerHTML = "Hide Missed";
                // hide images for show All button
                if (document.getElementById("showAllType"+cellType+"Button").innerHTML == "Hide All") {
                    document.getElementById("showAllType"+cellType+"Button").innerHTML = "Show All";
                    document.querySelector("#type"+cellType+"ResultDiv").innerHTML = '';
                    showAllButtonsClickNumMap.set(cellType,true);
                }
                showButtonsClickNumMap.set(cellType,false);
                addMissedImagesToDom(cellType,incorrectTypesMap.get(cellType));
            } else { // hide images for show button
                document.getElementById("type"+cellType+"Button").innerHTML = "Show Missed";
                document.querySelector("#type"+cellType+"ResultDiv").innerHTML = '';
                showButtonsClickNumMap.set(cellType,true);
            }
        });
    }
    for (var i = 0; i < 5; i++) {
        document.querySelectorAll(".show-all-type-button")[i].addEventListener('click', function() {
            var cellType = this.id.charAt(11);
            if (showAllButtonsClickNumMap.get(cellType)) { // show images for show all button
                document.getElementById("showAllType"+cellType+"Button").innerHTML = "Hide All";
                showAllButtonsClickNumMap.set(cellType,false);
                // hide images for show button
                if (document.getElementById("type"+cellType+"Button").innerHTML == "Hide Missed") {
                    document.getElementById("type"+cellType+"Button").innerHTML = "Show Missed";
                    document.querySelector("#type"+cellType+"ResultDiv").innerHTML = '';
                    showButtonsClickNumMap.set(cellType,true);
                }
                showButtonsClickNumMap.set(cellType,true);
                addAllImagesToDom();
            } else { // hide images for show all button
                document.getElementById("showAllType"+cellType+"Button").innerHTML = "Show All";
                document.querySelector("#type"+cellType+"ResultDiv").innerHTML = '';
                showAllButtonsClickNumMap.set(cellType,true);
            }
        });
    }
}

// run main function to init/create page
main();