// add content to pageHeader
overallScore = document.createElement('div');
overallScore.id = "overallScore";
overallAnsweredCorrect = document.createElement('div');
overallAnsweredCorrect.id = "overallAnsweredCorrect";
document.body.appendChild(pageHeaderDiv);
document.querySelector("#pageHeaderDiv").appendChild(overallScore);
document.querySelector("#pageHeaderDiv").appendChild(overallAnsweredCorrect);

// buffer to allow for gap between pageHeader and rest of page 
bufferDiv = document.createElement('div');
bufferDiv.id = "bufferDiv";
document.body.appendChild(bufferDiv);

// create results DIV for each different cell type  
var objLabels = ["Cell: CTC - ","Non-Cell: Uncharacterized Object - ", "Non-Cell: Fluorescent Artifact - ",
    "Non-Cell: CK/EpCAM Foci - ","Non-Cell: White Blood Cell - ","Non-Cell: Apoptotic Object - "];
var objTypes = ["CTC", "Unidentified Cell", "Fluorescent Artifact", "CK/EpCAM Foci", "White Blood Cell", "Apoptotic CTC"];

var numObjTypes = objTypes.length;

for (var i = 0; i < objTypes.length; i++) {

    objectDiv = document.createElement('div');
    objectDiv.id = "object" + i + "Div";
    document.querySelector("#objectsDiv").appendChild(objectDiv);

    objectInfoDiv = document.createElement('div');
    objectInfoDiv.id = "objectInfo" + i + "Div";
    objectInfoDiv.className = "object-info-div";
    document.querySelector("#object" + i + "Div").appendChild(objectInfoDiv);

    var objectHeaderDiv = document.createElement('div');
    objectHeaderDiv.id = "objectHeader" + i + "Div";
    objectHeaderDiv.className = "object-header-divs";
    document.querySelector("#object" + i + "Div").appendChild(objectHeaderDiv); 

    // object type 
    var objectTypeLabel = document.createElement('div');
    objectTypeLabel.id = "objectLabel" + i + "Div";
    objectTypeLabel.innerHTML = objLabels[i];
    objectTypeLabel.className = "object-type-labels";
    document.getElementById("objectInfo"+ i +"Div")
        .appendChild(objectTypeLabel);
}

/* Stores object paths of all incorrect user answers in the appropriate 
   cell type bin */
var wrongTypesMap = new Map();

// Stores object paths of all objects in the appropriate cell type bin
var allTypesMap = new Map();

/**
 * Main function that reads in JSON files, and links the data with the DOM.
 */
async function main() {
    var wrongObjectPathsJson = await fetch("/static/wrong_object_paths.json");
    var wrongObjectPathsText = await wrongObjectPathsJson.text();
    setObjectPaths(wrongObjectPathsText, wrongTypesMap, "wrong");

    var allObjectPathsJson = await fetch("/static/all_object_paths.json");
    var allObjectPathsText = await allObjectPathsJson.text();
    setObjectPaths(allObjectPathsText, allTypesMap, "all");

    var resultsJson = await fetch("/static/results_data.json");
    var resultsJsonText = await resultsJson.text();
    setResultsMaps(resultsJsonText);

    setResults();
    createBtns();

    // init showBtns functionality
    querySelectBtns(".show-type-btn", "showType", "Show Wrong", "Hide Wrong", 
                    "showAllType", "Show All", "Hide All", 8, showBtnsClicked,
                     showAllBtnsClicked, wrongTypesMap, "wrong");
    // init showAllBtns functionaily
    querySelectBtns(".show-all-type-btn", "showAllType", "Show All", "Hide All", 
                    "showType", "Show Wrong", "Hide Wrong", 11, showAllBtnsClicked,
                    showBtnsClicked, allTypesMap, "all");
}

// Stores the total number of incorrect responses by the user by cell type bin
var incorrectNumTypesMap = new Map();

// Stores the total number of objects per cell type bin
var totalNumTypesMap = new Map();

/**
 * Returns an array containing the data from the specified JSON file
 * @param {Promise} incorrectTypeBlocks - Promise obj that needs to be 
 *                                        parsed in order to obtain data
 */
function setObjectPaths(objectPathsText, typesMap) {
    var objectPathsString = filterString(objectPathsText);
    setTypesMap(objectPathsString.substring(0,objectPathsString.length - 1),
        typesMap);
}

/**
 * Creates string representing wrong_object_paths.JSON that excludes 
 * unnecessary tokens
 * @param {String} wrongObjectPathsText - contents from wrong_object_paths.JSON
 *                                        in String form
 * @return - String containing all wrong object paths
 */
function filterString(objectPathsText) {
    objectPathsString = "";
    for (let i in objectPathsText) {
        let t = objectPathsText[i];
        if (t != '{') {
            objectPathsString += t;
        }
    } 
    return objectPathsString;
}

/**
 * Occupies wrongTypesMap with the type of cell the user answered incorrectly 
 * and the object path associated with that cell.
 * @param {String} objectPathsString - String containing all wrong object paths.
 */
function setTypesMap(objectPathsString, typesMap) {
    var jsonObjArr = objectPathsString.split("}");
    // execute if block IF user wrong one or more objects
    if (jsonObjArr[0].length != 0) { 
        for (var i = 0; i < jsonObjArr.length; i++) {
            var jsonObjSubArr = jsonObjArr[i].split(":");
            var thisCellType = jsonObjSubArr[0].replaceAll('"','');
            thisCellType = thisCellType.replaceAll(' ','');
            thisCellType = thisCellType.replace('\n','');
            var objectPath = jsonObjSubArr[1].replaceAll('"','');
            if (typesMap.has(thisCellType)) {
                typesMap.get(thisCellType).push(objectPath);
            } else {
                typesMap.set(thisCellType, new Array(objectPath)); 
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
 * @param {Number} objectPathStartIndex - index in numByType string that 
 *                                       contains the start of the object path 
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

// total number of questions the user wrong
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
 * Adds incorrect cell objects to DOM
 * @param {Array} cellType - Stores all the cell type bins
 * @param {Array} incorrectTypeArr - Contains the paths of all incorrectly 
 *                                   answered objects based on cell type
 */
function addObjectsToDom(objNum, typesMap, objectType) {
    var objType = objTypes[objNum].replaceAll(' ','');
    var objectPaths = typesMap.get(objType);
    if (objectPaths != undefined) { // avoid getting length of empty objectPaths
        for (var i = 0; i < objectPaths.length; i++) {

            var messageDiv = document.createElement('div');
            messageDiv.className = "message-div";
            messageDiv.id = "messageDiv";
    
            var objectNum = objectPaths[i].substring(30,32);
            var objectPath = objectPaths[i];

            var newImg = document.createElement('img');
            newImg.src = objectPath;
            newImg.id="resultsImg";
    
            if (objectType == "wrong") {
                messageDiv.innerHTML = "You got object  " + objectNum + 
                    " incorrect";
            } else {
                messageDiv.innerHTML = "Object  " + objectNum;
            }
            document.querySelector("#img" + objNum + "Div")
                .appendChild(messageDiv);
            document.querySelector("#img" + objNum + "Div")
                .appendChild(newImg);
        }
    }
}

// Stores the total number of incorrect objects per cell type bin
var incorrectNumTypesMap = new Map();

// Stores the total number of objects per cell type bin
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
        dataMessageDiv.id = "dataMessage" + i + "Div"; 
        dataMessageDiv.className = "data-message-divs";
        var incorrectNumThisTypeValue = incorrectNumTypesMap
            .get(incorrectNumTypesMapKeys[i]);
        var totalNumThisTypeValue = totalNumTypesMap
            .get(totalNumTypesMapKeys[i]);

        totalCorrect -= incorrectNumThisTypeValue;
        totalNumQuestions += totalNumThisTypeValue;

        dataMessageDiv.innerHTML = 
            (totalNumThisTypeValue - incorrectNumThisTypeValue) + " out of " + 
                totalNumThisTypeValue;

        document.querySelector("#objectInfo" + i + "Div")
            .appendChild(dataMessageDiv);
    }
    document.querySelector("#overallScore").innerHTML = "Score: " + 
        Math.round(100*(totalCorrect/totalNumQuestions)) + "%";
    document.querySelector("#overallAnsweredCorrect").innerHTML = totalCorrect +
        " out of " + totalNumQuestions;
}

/**
 * Creates btn elements and adds them to the DOM
 */
function createBtns() {
    for (var i = 0; i < numObjTypes; i++) {
        var showTypeBtnDiv = document.createElement('span');
        showTypeBtnDiv.className = "show-type-btn-divs";
        showTypeBtnDiv.id = "showType" + i + "BtnDiv";
        document.querySelector("#object" + i + "Div")
            .appendChild(showTypeBtnDiv);
        var showTypeBtn = document.createElement('button');
        showTypeBtn.innerHTML = "Show Wrong";
        showTypeBtn.id = "showType" + i + "Btn";
        showTypeBtn.className = "show-type-btn";
        document.querySelector("#showType"+ i + "BtnDiv")
            .appendChild(showTypeBtn);

        var showAllTypeBtnDiv = document.createElement('span');
        showAllTypeBtnDiv.className = "show-all-type-btn-divs";
        showAllTypeBtnDiv.id = "showAllType" + i + "BtnDiv";
        document.querySelector("#object" + i +"Div")
            .appendChild(showAllTypeBtnDiv);
        var showAllTypeBtn = document.createElement('button');
        showAllTypeBtn.innerHTML = "Show All";
        showAllTypeBtn.id = "showAllType" + i + "Btn";
        showAllTypeBtn.className = "show-all-type-btn";
        document.querySelector("#showAllType" + i + "BtnDiv")
            .appendChild(showAllTypeBtn);


        // objects divs 
        var imgDiv = document.createElement('div');
        imgDiv.id = "img" + i + "Div";
        document.querySelector("#object" + i +"Div")
        .appendChild(imgDiv);

        // line breaks
        if (i < numObjTypes - 1) {
            var lineBreak = document.createElement('hr');
            lineBreak.className = "line-breaks";
            document.querySelector("#object" + i +"Div")
            .appendChild(lineBreak);
        }
    }
}

/*
  Stores whether or not a particular show btn has been clicked (false) 
  or not (true)
*/
var showBtnsClicked = [true,true,true,true,true,true];

// Stores whether or not a particular show all btn has been clicked (false) 
// or not (true)
var showAllBtnsClicked = [true,true,true,true,true,true];

/**
 * Adds an event listener to all of the show and show all btns. Contains 
 * code allowing for the dynamic content of these btns.
 * @param {String} thisBtnClass - this button's class.
 * @param {String} thisBtnId - this button's id.
 * @param {String} thisShowMsg - message button shows when it's not activated
 * @param {String} thisHideMsg - message button shows when it's activated
 * @param {String} otherBtnId - other button's id (e.g. if button is show
 *                              wrong button, opposite button is the show 
 *                              all button).
 * @param {String} otherShowMsg - message that other button shows when activated
 * @param {String} otherHideMsg -  message that other button shows when 
 *                                 deactivated
 * @param {Number} thisIdIndex - index providing the button's id num (the id
 *                               num is a number 1-6 and was assigned when 
 *                               button was created to differentiate between 
 *                               the 6 buttons of each class). 
 * @param {Array} thisBtnsClicked - Keeps track of whether the button is 
 *                                  activated (show or hide mode) or not.
 * @param {Array} otherBtnsClicked - Keeps track of whether the other button is 
 *                               is activated (show or hide mode) or not.
 * @param {Map} typesMap - map containing all the object paths (either wrong 
 *                       object or all object paths).
 * @param {String} imgType - differentiates between the wrongTypesMap and 
 *                           allTypesMap. 
 */
function querySelectBtns(thisBtnClass, thisBtnId, thisShowMsg, thisHideMsg, 
                         otherBtnId, otherShowMsg, otherHideMsg, thisIdIndex, 
                         thisBtnsClicked, otherBtnsClicked, typesMap, imgType) {
    for (var i = 0; i < numObjTypes; i++) {
        document.querySelectorAll(thisBtnClass)[i].addEventListener('click',
             function() {
                var objNum = Number(this.id.charAt(thisIdIndex));
                var clicked = thisBtnsClicked[objNum];
                // show objects for show btn
                if (clicked) {
                    document.getElementById(thisBtnId + objNum + "Btn")
                        .innerHTML = thisHideMsg;
                    if (document.getElementById(otherBtnId + objNum + "Btn")
                            .innerHTML == otherHideMsg) {
                        document.getElementById(otherBtnId + objNum + "Btn")
                            .innerHTML = otherShowMsg;
                        document.querySelector("#img" + objNum + "Div")
                            .innerHTML = '';
                        otherBtnsClicked[objNum] = true;
                    }
                    thisBtnsClicked[objNum] = false;
                    addObjectsToDom(objNum, typesMap, imgType);
                } else { // hide objects for show btn
                    document.getElementById(thisBtnId + objNum + "Btn")
                        .innerHTML = thisShowMsg;
                    document.querySelector("#img" + objNum + "Div")
                        .innerHTML = '';
                        thisBtnsClicked[objNum] = true;
                }
        });
    }
}

// run main function to init/create page
main();