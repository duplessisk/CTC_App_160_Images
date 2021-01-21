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
var objTypes = ["CTC","Unidentified Cell","Fluorescent Artifact",
    "CK/EpCAM Foci","White Blood Cell","Apoptotic CTC"];

var numObjTypes = objTypes.length;

for (var i = 0; i < objTypes.length; i++) {
    // typeHeader DIVs
    typeHeaderDiv = document.createElement('div');
    typeHeaderDiv.className = "header-divs"
    typeHeaderDiv.id = "type"+ i +"HeaderDiv";
    document.body.appendChild(typeHeaderDiv);
    // typeResult DIVs
    var typeResultsDiv = document.createElement('div');
    typeResultsDiv.id = "type"+ i +"ResultDiv";
    typeResultsDiv.className = "types";
    document.body.appendChild(typeResultsDiv);
    // typeLabel
    var typeLabel = document.createElement('p');
    typeLabel.innerHTML = objTypes[i] + " Results";
    typeLabel.className = "label-types";
    document.getElementById("type"+ i +"HeaderDiv")
        .appendChild(typeLabel);
    // line breaks
    if (i < numObjTypes - 1) {
        var lineBreaks = document.createElement('hr');
        lineBreaks.className = "line-breaks";
        document.body.append(lineBreaks);
    }
}

/* Stores image paths of all incorrect user answers in the appropriate 
   cell type bin */
var missedTypesMap = new Map();

// Stores image paths of all images in the appropriate cell type bin
var allTypesMap = new Map();

/**
 * Main function that reads in JSON files, and links the data with the DOM.
 */
async function main() {
    var missedImagePathsJson = await fetch("/static/missed_image_paths.json");
    var missedImagePathsText = await missedImagePathsJson.text();
    setImagePaths(missedImagePathsText, missedTypesMap, "missed");

    var allImagePathsJson = await fetch("/static/all_image_paths.json");
    var allImagePathsText = await allImagePathsJson.text();
    setImagePaths(allImagePathsText, allTypesMap, "all");

    var resultsJson = await fetch("/static/results_data.json");
    var resultsJsonText = await resultsJson.text();
    setResultsMaps(resultsJsonText);

    setResults();
    createButtons();
    querySelectButtons();
}

// Stores the total number of incorrect responses by the user by cell type bin
var incorrectNumTypesMap = new Map();

// Stores the total number of images per cell type bin
var totalNumTypesMap = new Map();

/**
 * Returns an array containing the data from the specified JSON file
 * @param {Promise} incorrectTypeBlocks - Promise obj that needs to be 
 *                                        parsed in order to obtain data
 */
function setImagePaths(imagePathsText, typesMap) {
    var imagePathsString = filterString(imagePathsText);
    setTypesMap(imagePathsString.substring(0,imagePathsString.length - 1),
        typesMap);
}

/**
 * Creates string representing missed_image_paths.JSON that excludes 
 * unnecessary tokens
 * @param {String} missedImagePathsText - contents from missed_image_paths.JSON
 *                                        in String form
 * @return - String containing all missed image paths
 */
function filterString(imagePathsText) {
    imagePathsString = "";
    for (let i in imagePathsText) {
        let t = imagePathsText[i];
        if (t != '{') {
            imagePathsString += t;
        }
    } 
    return imagePathsString;
}

/**
 * Occupies missedTypesMap with the type of cell the user answered incorrectly 
 * and the image path associated with that cell.
 * @param {String} imagePathsString - String containing all missed image paths.
 */
function setTypesMap(imagePathsString, typesMap) {
    var jsonObjArr = imagePathsString.split("}");
    // execute if block IF user missed one or more images
    if (jsonObjArr[0].length != 0) { 
        for (var i = 0; i < jsonObjArr.length; i++) {
            var jsonObjSubArr = jsonObjArr[i].split(":");
            var thisCellType = jsonObjSubArr[0].replaceAll('"','');
            thisCellType = thisCellType.replaceAll(' ','');
            thisCellType = thisCellType.replace('\n','');
            var imagePath = jsonObjSubArr[1].replaceAll('"','');
            if (typesMap.has(thisCellType)) {
                typesMap.get(thisCellType).push(imagePath);
            } else {
                typesMap.set(thisCellType, new Array(imagePath)); 
            }    
        }
    }
}

/**
 * Sets incorrectNumTypesMap and totalNumTypesMap with contents from 
 * results_data.json. 
 * @param {String} resultsText - String representation of results_data.json 
 *                               contents. 
 */
function setResultsMaps(resultsText) {
    var resultsString = filterString(resultsText);

    var jsonResultsArr = resultsString.split("}");
    setTotalNumIncorrect(jsonResultsArr[0]);
    setNumByTypesMap(jsonResultsArr[1], incorrectNumTypesMap);
    setNumByTypesMap(jsonResultsArr[2], totalNumTypesMap);
}

/**
 * Sets the total number of incorrect responses or total number of questions by
 * cell bin type 
 * @param {String} numByTypeString -   
 * @param {Map<String,Array>} numTypesMap - Map to set either 
 *                                          incorrectNumsTypeMap 
 *                                          or totalNumsTypeMap
 * @param {Number} thisCellTypeIndex - index in numByTypeString that contains 
 *                                     the proper cell type bin
 * @param {Number} imagePathStartIndex - index in numByType string that 
 *                                       contains the start of the image path 
 *                                       of interest.
 */
function setNumByTypesMap(numByTypeString, numTypesMap) {
    var numTypeArr = numByTypeString.split(",");
    for (var i = 0; i < numTypeArr.length; i++) {
        var numTypeSubArr = numTypeArr[i].split(":");
        var thisCellType = numTypeSubArr[0];
        var numType = numTypeSubArr[1];
        numTypesMap.set(thisCellType, Number(numType)); 
    }
}

// total number of questions the user missed
var totalNumIncorrect;

/**
 * Sets the total number of incorrect responses by the user 
 * @param {String} totalNumIncorrectString - String representing data from 
 *                                           results_data.json. Contains total 
 *                                           number of incorrect responses by 
 *                                           the user. 
 */
function setTotalNumIncorrect(totalNumIncorrectString) {
    totalNumIncorrect = totalNumIncorrectString.substring(23,
        totalNumIncorrectString.length);
}

/**
 * Adds incorrect cell images to DOM
 * @param {Array} cellType - Stores all the cell type bins
 * @param {Array} incorrectTypeArr - Contains the paths of all incorrectly 
 *                                   answered images based on cell type
 */
function addImagesToDom(objNum, typesMap, imageType) {
    var objType = objTypes[objNum].replaceAll(' ','');
    var imagePaths = typesMap.get(objType);

    if (imagePaths != undefined) { // avoid getting length of empty imagePaths
        for (var i = 0; i < imagePaths.length; i++) {

            var messageDiv = document.createElement('div');
            messageDiv.className = "message-div";
            messageDiv.id = "messageDiv";
    
            var imageNum = imagePaths[i].substring(30,32);
            var imagePath = imagePaths[i];

            var newImg = document.createElement('img');
            newImg.src = imagePath;
            newImg.id="resultsImg";
    
            if (imageType == "missed") {
                messageDiv.innerHTML = "You got image  " + imageNum + 
                    " incorrect";
            } else {
                messageDiv.innerHTML = "Image  " + imageNum;
            }
            document.querySelector("#type" + objNum + "ResultDiv")
                .appendChild(messageDiv);
            document.querySelector("#type" + objNum + "ResultDiv")
                .appendChild(newImg);
        }
    }
}

// Stores the total number of incorrect images per cell type bin
var incorrectNumTypesMap = new Map();

// Stores the total number of images per cell type bin
var totalNumTypesMap = new Map();

/**
 * Uses information stored within totalIncorrect, incorrectNumTypesMap, and 
 * totalNumTypesMap to add the appropriate user data to the DOM.
 */
function setResults() {
    var totalCorrect = 50;
    var totalNumQuestions = 0;
    var incorrectNumTypesMapKeys = Array.from(incorrectNumTypesMap.keys());
    var totalNumTypesMapKeys = Array.from(totalNumTypesMap.keys());
    for (var i = 0; i < numObjTypes; i++) {
        var dataMessageDiv = document.createElement('div');
        dataMessageDiv.className = "data-messages";
        var incorrectNumThisTypeValue = incorrectNumTypesMap
            .get(incorrectNumTypesMapKeys[i]);
        var totalNumThisTypeValue = totalNumTypesMap
            .get(totalNumTypesMapKeys[i]);

        totalCorrect -= incorrectNumThisTypeValue;
        totalNumQuestions += totalNumThisTypeValue;

        if (incorrectNumThisTypeValue == 0) {
            dataMessageDiv.innerHTML = "You missed no images (100%)";
        } else if (incorrectNumThisTypeValue == 1) {
            dataMessageDiv.innerHTML = "You missed " + 
                incorrectNumThisTypeValue + " image (" +
                    Math.round((100 - 100*incorrectNumThisTypeValue/totalNumThisTypeValue)) 
                        +"%)";
        } else {
            dataMessageDiv.innerHTML = "You missed " +
                incorrectNumThisTypeValue + " images (" +
                    Math.round((100 - 100*incorrectNumThisTypeValue/totalNumThisTypeValue))
                        + "%)";
            }
        document.querySelector("#type" + i + "HeaderDiv")
            .appendChild(dataMessageDiv);
    }
    document.querySelector("#overallResults").innerHTML = "Score: " + 
        Math.round(100*(totalCorrect/totalNumQuestions)) + "% (" + 
        totalCorrect + " out of " + totalNumQuestions + ")";
}

/**
 * Creates button elements and adds them to the DOM
 */
function createButtons() {
    for (var i = 0; i < numObjTypes; i++) {
        var typeButtonDiv = document.createElement('span');
        typeButtonDiv.className = "type-button-divs";
        typeButtonDiv.id = "type" + i + "ButtonDiv";
        document.querySelector("#type" + i + "HeaderDiv")
            .appendChild(typeButtonDiv);
        var typeButton = document.createElement('button');
        typeButton.innerHTML = "Show Missed";
        typeButton.id = "type"+ i + "Button";
        typeButton.className = "show-type-button";
        document.querySelector("#type" + i + "ButtonDiv")
            .appendChild(typeButton);

        var showAllTypeButtonDiv = document.createElement('span');
        showAllTypeButtonDiv.className = "show-all-type-button-divs";
        showAllTypeButtonDiv.id = "showAllType" + i + "ButtonDiv";
        document.querySelector("#type" + i +"HeaderDiv")
            .appendChild(showAllTypeButtonDiv);
        var showAllTypeButton = document.createElement('button');
        showAllTypeButton.innerHTML = "Show All";
        showAllTypeButton.id = "showAllType" + i + "Button";
        showAllTypeButton.className = "show-all-type-button";
        document.querySelector("#showAllType" + i + "ButtonDiv")
            .appendChild(showAllTypeButton);
    }
}

/*
  Stores whether or not a particular show button has been clicked (false) 
  or not (true)
*/
var showButtonsClicked = [true,true,true,true,true,true];

// Stores whether or not a particular show all button has been clicked (false) 
// or not (true)
var showAllButtonsClicked = [true,true,true,true,true,true];

/**
 * Adds an event listener to all of the show and show all buttons. Contains 
 * code allowing for the dynamic content of these buttons.
 */
function querySelectButtons() {
    for (var i = 0; i < numObjTypes; i++) {
        document.querySelectorAll(".show-type-button")[i]
            .addEventListener('click', function() {
            var objNum = Number(this.id.charAt(4));
            var clicked = showButtonsClicked[objNum];
            // show images for show button
            if (clicked) {
                document.getElementById("type"+objNum+"Button")
                    .innerHTML = "Hide Missed";
                if (document.getElementById("showAllType"+objNum+"Button")
                        .innerHTML == "Hide All") {
                    document.getElementById("showAllType"+objNum+"Button").
                        innerHTML = "Show All";
                    document.querySelector("#type"+objNum+"ResultDiv")
                        .innerHTML = '';
                    showAllButtonsClicked[objNum] = true;
                }
                showButtonsClicked[objNum] = false;
                addImagesToDom(objNum, missedTypesMap, "missed");
            } else { // hide images for show button
                document.getElementById("type"+objNum+"Button")
                    .innerHTML = "Show Missed";
                document.querySelector("#type"+objNum+"ResultDiv")
                    .innerHTML = '';
                    showButtonsClicked[objNum] = true;
            }
        });
    }
    for (var i = 0; i < objTypesLen; i++) {
        document.querySelectorAll(".show-all-type-button")[i]
            .addEventListener('click', function() {
            var objNum = Number(this.id.charAt(11));
            var clicked = showAllButtonsClicked[objNum];
            // show images for show all button
            if (clicked) { 
                document.getElementById("showAllType"+objNum+"Button")
                    .innerHTML = "Hide All";
                showAllButtonsClicked[objNum] = false;
                // hide images for show button
                if (document.getElementById("type"+objNum+"Button")
                    .innerHTML == "Hide Missed") {
                    document.getElementById("type"+objNum+"Button")
                        .innerHTML = "Show Missed";
                    document.querySelector("#type"+objNum+"ResultDiv")
                        .innerHTML = '';
                    showButtonsClicked[objNum] = true;
                }
                showButtonsClicked[objNum] = true;
                addImagesToDom(objNum, allTypesMap, "all");
            } else { // hide images for show all button
                document.getElementById("showAllType"+objNum+"Button")
                    .innerHTML = "Show All";
                document.querySelector("#type"+objNum+"ResultDiv")
                    .innerHTML = '';
                showAllButtonsClicked[objNum] = true;
            }
        });
    }
}

// run main function to init/create page
main();