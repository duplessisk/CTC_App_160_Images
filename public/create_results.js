// create cell types
var cellTypes = ['A','A','A','A','A','A','A','A','A','A',
                 'B','B','B','B','B','B','B','B','B','B',
                 'C','C','C','C','C','C','C','C','C','C',
                 'D','D','D','D','D','D','D','D','D','D',
                 'E','E','E','E','E','E','E','E','E','E',
                ];

getBlock();

// create DIVs with correct structure

// pageHeader DIV
pageHeaderDiv = document.createElement('div');
pageHeaderDiv.id = "pageHeaderDiv";
document.body.appendChild(pageHeaderDiv);
overallResults = document.createElement('div');
overallResults.id = "overallResults";
overallResults.innerHTML = "Replace This Text";
document.querySelector("#pageHeaderDiv").appendChild(overallResults);

bufferDiv = document.createElement('div');
bufferDiv.id = "bufferDiv";
document.body.appendChild(bufferDiv);

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

var buttonsClickNumMap = new Map([['A', 0], ['B', 0], ['C', 0], ['D', 0], ['E', 0]]);
var incorrectCellTypesMap = new Map([['A', []], ['B', []], ['C', []], ['D', []], ['E', []]]);
var totalNumByType = new Map([['A', 0], ['B', 0], ['C', 0], ['D', 0], ['E', 0]]);
var totalIncorrectByType = new Map([['A', 0], ['B', 0], ['C', 0], ['D', 0], ['E', 0]]);
var incorrectPercentageByType = [100,100,100,100,100];

async function getBlock() {
    let jsonBlocks;
    try {
        var response = await fetch("/static/incorrect_image_paths.json");
        jsonBlocks = await response.text();
        var arr = jsonObjectContents(jsonBlocks);
        buildDoc(arr);
    } catch (e) {
        console.error(e);
    }
    getTotalNumByType();
    getIncorrectPercentageByType();
    initDataMessage();
    createButtons();
    querySelectButtons();
    var testScore = calculateTestScore();
    var totalCorrect = 50 - getNumIncorrect();
    document.querySelector("#overallResults").innerHTML = "Score: " + testScore + "% (" + totalCorrect + " out of " + cellTypes.length + ")";
}

function getNumIncorrect() {
    var numIncorrect = 0;
    var totalIncorrectByTypeKeys = Array.from(totalIncorrectByType.keys());
    // console.log(totalIncorrectByTypeKeys.toString())
    for (var i = 0; i < totalIncorrectByTypeKeys.length; i++) {
        numIncorrect += totalIncorrectByType.get(totalIncorrectByTypeKeys[i]);
    }
    return numIncorrect;
}

function calculateTestScore() {
    var totalPercentage = 0;
    for (var i = 0; i < incorrectPercentageByType.length; i++) {
        totalPercentage += incorrectPercentageByType[i];
    }
    return totalPercentage/incorrectPercentageByType.length;
}

// create buttons
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

var showButtonsClickNumMap = new Map([['A', true], ['B', true], ['C', true], ['D', true], ['E', true]]);
var showAllButtonsClickNumMap = new Map([['A', true], ['B', true], ['C', true], ['D', true], ['E', true]]);

function querySelectButtons() {
    for (var i = 0; i < 5; i++) {
        document.querySelectorAll(".show-type-button")[i].addEventListener('click', function() {
            var s = this.id.charAt(4);
            if (showButtonsClickNumMap.get(s)) { // show images for show button
                document.getElementById("type"+s+"Button").innerHTML = "Hide Missed";
                // hide images for show All button
                if (document.getElementById("showAllType"+s+"Button").innerHTML == "Hide All") {
                    document.getElementById("showAllType"+s+"Button").innerHTML = "Show All";
                    document.querySelector("#type"+s+"ResultDiv").innerHTML = '';
                    showAllButtonsClickNumMap.set(s,true);
                }
                showButtonsClickNumMap.set(s,false);
                initTypeResultDivs(s);
            } else { // hide images for show button
                document.getElementById("type"+s+"Button").innerHTML = "Show Missed";
                document.querySelector("#type"+s+"ResultDiv").innerHTML = '';
                showButtonsClickNumMap.set(s,true);
            }
        });
    }

    for (var i = 0; i < 5; i++) {
        document.querySelectorAll(".show-all-type-button")[i].addEventListener('click', function() {
            var s = this.id.charAt(11);
            if (showAllButtonsClickNumMap.get(s)) { // show images for show all button
                document.getElementById("showAllType"+s+"Button").innerHTML = "Hide All";
                showAllButtonsClickNumMap.set(s,false);
                // hide images for show button
                if (document.getElementById("type"+s+"Button").innerHTML == "Hide Missed") {
                    document.getElementById("type"+s+"Button").innerHTML = "Show Missed";
                    document.querySelector("#type"+s+"ResultDiv").innerHTML = '';
                    showButtonsClickNumMap.set(s,true);
                }
                showButtonsClickNumMap.set(s,true);
                setAllImagesPath(s);
            } else { // hide images for show all button
                document.getElementById("showAllType"+s+"Button").innerHTML = "Show All";
                document.querySelector("#type"+s+"ResultDiv").innerHTML = '';
                showAllButtonsClickNumMap.set(s,true);
            }
        });
    }
}

function initTypeResultDivs(s) {
    var cellTypeMissed = incorrectCellTypesMap.get(s);
    for (var j = 0; j < cellTypeMissed.length; j++) {
        var newImg = document.createElement('img');
        newImg.id="resultsImg";
        var missedImagePath = cellTypeMissed[j];
        var imageNum = missedImagePath.substring(25,27);
        newImg.src = getMissedImageSrc(missedImagePath);
        var messageDiv = document.createElement('div');
        messageDiv.className = "message-div";
        messageDiv.id = "messageDiv";
        messageDiv.innerHTML = "You got image  " + imageNum + " incorrect";
        document.querySelector("#type"+s+"ResultDiv").appendChild(messageDiv);
        document.querySelector("#type"+s+"ResultDiv").appendChild(newImg);
    }
}

function setAllImagesPath(s) {
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < 10; j++) {
            var imageNum = String(i) + String(j);
            var localCellType;
            if (Number(imageNum.charAt(0) == 0)) {
                var num = Number(imageNum.charAt(1));
                localCellType = cellTypes[num];
            } else {
                localCellType = cellTypes[imageNum];
            }
            if (localCellType == s) {
                var newImg = document.createElement('img');
                newImg.src = "/static/cell_answers/cell" +imageNum+ "answer.JPG";
                newImg.id="resultsImg";

                var messageDiv = document.createElement('div');
                messageDiv.className = "message-div";
                messageDiv.id = "messageDiv";
                messageDiv.innerHTML = "Image " + imageNum;
    
                document.querySelector("#type"+localCellType+"ResultDiv").appendChild(messageDiv);
                document.querySelector("#type"+localCellType+"ResultDiv").appendChild(newImg); 
            }           
        }
    }
}

function initDataMessage() {
    var totalIncorrectByTypeKeys = Array.from(totalIncorrectByType.keys());
    for (var i = 0; i < totalIncorrectByTypeKeys.length; i++) {
        var dataMessageDiv = document.createElement('div');
        dataMessageDiv.className = "data-messages";
        if (totalIncorrectByType.get(totalIncorrectByTypeKeys[i]) == 0) {
            dataMessageDiv.innerHTML = "You missed no images (" +incorrectPercentageByType[i]+"%)";
        } else if (totalIncorrectByType.get(totalIncorrectByTypeKeys[i]) == 1) {
            dataMessageDiv.innerHTML = "You missed "+totalIncorrectByType.get(totalIncorrectByTypeKeys[i])+" image (" +incorrectPercentageByType[i]+"%)";
        } else {
            dataMessageDiv.innerHTML = "You missed "+totalIncorrectByType.get(totalIncorrectByTypeKeys[i])+" images (" +incorrectPercentageByType[i]+"%)";
        }
        document.querySelector("#type"+tempTypes[i]+"HeaderDiv").appendChild(dataMessageDiv);
    }
}

function getTotalNumByType() {
    for (var i = 0; i < cellTypes.length; i++) {
        var totalTypeCount = totalNumByType.get(cellTypes[i]);
        totalNumByType.set(cellTypes[i],totalTypeCount + 1);
    }
}

function getIncorrectPercentageByType() {
    var totalNumByTypeKeys = Array.from(totalNumByType.keys());
    var totalIncorrectByTypeKeys = Array.from(totalIncorrectByType.keys());
    for (var i = 0; i < incorrectPercentageByType.length; i++) {
        var totalNumByTypeValue = totalNumByType.get(totalNumByTypeKeys[i]);
        var totalIncorrectByTypeValue = totalIncorrectByType.get(totalIncorrectByTypeKeys[i]);
        incorrectPercentageByType[i] = 
                100*(totalNumByTypeValue - totalIncorrectByTypeValue)/(totalNumByTypeValue);
    }
}

function getMissedImageSrc(missedImagePath) {
    missedImagePath = missedImagePath.substring(1);
    missedImagePath = missedImagePath.substring(0,missedImagePath.length);
    return missedImagePath;
}

function jsonObjectContents(jsonBlocks) {
    var imagePathStrings = "";
    for (let i in jsonBlocks) {
        let t = jsonBlocks[i];
        if (t != '{') {
            imagePathStrings += t;
        }
    } 
    var arr = imagePathStrings.split("}");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].substring(12);
    }
    return arr;
}

function buildDoc(arr) {
    if (arr.length-1 != 0) {
        for (var i = 0; i < arr.length-1; i++) {
            var missedImagePath = getMissedImagePath(arr[i]);
            placeInCorrectCategory(missedImagePath);            
        }
    } 
}

// functions to process data from JSON file
function getMissedImagePath(missedImagePath) {
    missedImagePath = missedImagePath.substring(1);
    missedImagePath = missedImagePath.substring(0,missedImagePath.length-1);
    return missedImagePath;
}

function placeInCorrectCategory(missedImagePath) {
    var imageNum = missedImagePath.substring(25,27);
    var localCellType;
    if (Number(imageNum.charAt(0) == 0)) {
        var num = Number(imageNum.charAt(1));
        localCellType = cellTypes[num];
    } else {
        localCellType = cellTypes[imageNum];
    }
    var incorrectCellTypeCount = totalIncorrectByType.get(localCellType);
    totalIncorrectByType.set(localCellType,incorrectCellTypeCount + 1);
    incorrectCellTypesMap.get(localCellType).push(missedImagePath);
}