// create cell types
var cellTypes = ['A','A','A','A','A','A','A','A','A','A',
                 'B','B','B','B','B','B','B','B','B','B',
                 'C','C','C','C','C','C','C','C','C','C',
                 'D','D','D','D','D','D','D','D','D','D',
                 'E','E','E','E','E','E','E','E','E','E',
                ];

getBlock();

// create DIVs with correct structure
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
    // initTypeResultDivs();
    getTotalNumByType();
    getIncorrectPercentageByType();
    initDataMessage();
    createButtons();
    querySelectButtons();
}

// create buttons
function createButtons() {
    for (var i = 0; i < 5; i++) {
        var typeButtonDiv = document.createElement('span');
        typeButtonDiv.className = "type-button-divs";
        typeButtonDiv.id = "type"+tempTypes[i]+"ButtonDiv";
        document.querySelector("#type"+tempTypes[i]+"HeaderDiv").appendChild(typeButtonDiv);
        var typeButton = document.createElement('button');
        typeButton.innerHTML = "Show";
        typeButton.id = "type"+tempTypes[i]+"Button";
        typeButton.className = "show-type-button";
        document.querySelector("#type"+tempTypes[i]+"ButtonDiv").appendChild(typeButton);

        var showAllTypeButtonDiv = document.createElement('span');
        showAllTypeButtonDiv.className = "show-all-type-button-divs";
        showAllTypeButtonDiv.id = "showAllType"+tempTypes[i]+"ButtonDiv";
        document.querySelector("#type"+tempTypes[i]+"HeaderDiv").appendChild(showAllTypeButtonDiv);
        var showAllTypeButton = document.createElement('button');
        showAllTypeButton.innerHTML = "Show All";
        showAllTypeButton.id = "showAll"+tempTypes[i]+"TypeButton";
        showAllTypeButton.className = "show-all-type-button";
        document.querySelector("#showAllType"+tempTypes[i]+"ButtonDiv").appendChild(showAllTypeButton);
        // document.querySelector("#type"+tempTypes[i]+"ButtonDiv").appendChild(showAllTypeButton);
    }
}

var buttonsClickNumMap = new Map([['A', 0], ['B', 0], ['C', 0], ['D', 0], ['E', 0]]);
function querySelectButtons() {
    for (var i = 0; i < 5; i++) {
        document.querySelectorAll(".show-type-button")[i].addEventListener('click', function() {
            var s = this.id.charAt(4);
            if (buttonsClickNumMap.get(s)%2 == 0) {
                document.getElementById("type"+s+"Button").innerHTML = "Hide";
                initTypeResultDivs(s);
            } else {
                document.getElementById("type"+s+"Button").innerHTML = "Show";
                document.querySelector("#type"+s+"ResultDiv").innerHTML = '';
            }
            buttonsClickNumMap.set(s,buttonsClickNumMap.get(s) + 1);
        });
    }
}

function initDataMessage() {
    var totalNumByTypeKeys = Array.from(totalNumByType.keys());
    for (var i = 0; i < totalNumByTypeKeys.length; i++) {
        var dataMessageDiv = document.createElement('div');
        dataMessageDiv.className = "data-messages";
        dataMessageDiv.innerHTML = "You missed "+totalNumByType.get(totalNumByTypeKeys[i])+" images (" +incorrectPercentageByType[i]+"%)";
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
    } else {
        document.body.append("you got no images incorrect!");
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

    // console.log("totalIncorrectByTypeA: " + totalIncorrectByType.get("A"));
    // console.log("totalIncorrectByTypeB: " + totalIncorrectByType.get("B"));
    // console.log("totalIncorrectByTypeC: " + totalIncorrectByType.get("C"));
    // console.log("totalIncorrectByTypeD: " + totalIncorrectByType.get("D"));
    // console.log("totalIncorrectByTypeE: " + totalIncorrectByType.get("E"));
    // console.log("totalNumByTypeA: " + totalNumByType.get("A"));
    // console.log("totalNumByTypeB: " + totalNumByType.get("B"));
    // console.log("totalNumByTypeC: " + totalNumByType.get("C"));
    // console.log("totalNumByTypeD: " + totalNumByType.get("D"));
    // console.log("totalNumByTypeE: " + totalNumByType.get("E"));
    // console.log("incorrectPercentageByTypeA: " + incorrectPercentageByType[0]);
    // console.log("incorrectPercentageByTypeB: " + incorrectPercentageByType[1]);
    // console.log("incorrectPercentageByTypeC: " + incorrectPercentageByType[2]);
    // console.log("incorrectPercentageByTypeD: " + incorrectPercentageByType[3]);
    // console.log("incorrectPercentageByTypeE: " + incorrectPercentageByType[4]);