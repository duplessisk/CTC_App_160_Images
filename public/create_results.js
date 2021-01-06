// create cell types
var cellTypes = ['A','A','A','A','A','A','A','A','A','A',
                 'B','B','B','B','B','B','B','B','B','B',
                 'C','C','C','C','C','C','C','C','C','C',
                 'D','D','D','D','D','D','D','D','D','D',
                 'E','E','E','E','E','E','E','E','E','E',
                ];

// create DIVs
var typeAHeaderDiv = document.createElement('div');
typeAHeaderDiv.id = "typeAHeaderDiv";
document.body.appendChild(typeAHeaderDiv);
var typeAResultsDiv = document.createElement('div');
typeAResultsDiv.id = "typeAResultDiv";
typeAResultsDiv.className = "types";
document.body.appendChild(typeAResultsDiv);
var typeALabel = document.createElement('p');
typeALabel.innerHTML = "Type A Cell Results";
typeALabel.className = "label-types";
document.getElementById("typeAHeaderDiv").appendChild(typeALabel);

var typeBHeaderDiv = document.createElement('div');
typeBHeaderDiv.id = "typeBHeaderDiv";
document.body.appendChild(typeBHeaderDiv);
var typeBResultsDiv = document.createElement('div');
typeBResultsDiv.id = "typeBResultDiv";
typeBResultsDiv.className = "types";
document.body.appendChild(typeBResultsDiv);
var typeBLabel = document.createElement('p');
typeBLabel.innerHTML = "Type B Cell Results";
typeBLabel.className = "label-types";
document.getElementById("typeBHeaderDiv").appendChild(typeBLabel);

var typeCHeaderDiv = document.createElement('div');
typeCHeaderDiv.id = "typeCHeaderDiv";
document.body.appendChild(typeCHeaderDiv);
var typeCResultsDiv = document.createElement('div');
typeCResultsDiv.id = "typeCResultDiv";
typeCResultsDiv.className = "types";
document.body.appendChild(typeCResultsDiv);
var typeCLabel = document.createElement('p');
typeCLabel.innerHTML = "Type C Cell Results";
typeCLabel.className = "label-types";
document.getElementById("typeCHeaderDiv").appendChild(typeCLabel);

var typeDHeaderDiv = document.createElement('div');
typeDHeaderDiv.id = "typeDHeaderDiv";
document.body.appendChild(typeDHeaderDiv);
var typeDResultsDiv = document.createElement('div');
typeDResultsDiv.id = "typeDResultDiv";
typeDResultsDiv.className = "types";
document.body.appendChild(typeDResultsDiv);
var typeDLabel = document.createElement('p');
typeDLabel.innerHTML = "Type D Cell Results";
typeDLabel.className = "label-types";
document.getElementById("typeDHeaderDiv").appendChild(typeDLabel);

var typeEHeaderDiv = document.createElement('div');
typeEHeaderDiv.id = "typeEHeaderDiv";
document.body.appendChild(typeEHeaderDiv);
var typeEResultsDiv = document.createElement('div');
typeEResultsDiv.id = "typeEResultDiv";
typeEResultsDiv.className = "types";
document.body.appendChild(typeEResultsDiv);
var typeELabel = document.createElement('p');
typeELabel.innerHTML = "Type E Cell Results";
typeELabel.className = "label-types";
document.getElementById("typeEHeaderDiv").appendChild(typeELabel);

// create buttons
var typeAButton = document.createElement('button');
typeAButton.innerHTML = "Show";
typeAButton.id = "typeAButton";
typeAButton.className = "show-type-button";
document.querySelector("#typeAHeaderDiv").appendChild(typeAButton);

var typeBButton = document.createElement('button');
typeBButton.innerHTML = "Show";
typeBButton.id = "typeBButton";
typeBButton.className = "show-type-button";
document.querySelector("#typeBHeaderDiv").appendChild(typeBButton);

var typeCButton = document.createElement('button');
typeCButton.innerHTML = "Show";
typeCButton.id = "typeCButton";
typeCButton.className = "show-type-button";
document.querySelector("#typeCHeaderDiv").appendChild(typeCButton);

var typeDButton = document.createElement('button');
typeDButton.innerHTML = "Show";
typeDButton.id = "typeDButton";
typeDButton.className = "show-type-button";
document.querySelector("#typeDHeaderDiv").appendChild(typeDButton);

var typeEButton = document.createElement('button');
typeEButton.innerHTML = "Show";
typeEButton.id = "typeEButton";
typeEButton.className = "show-type-button";
document.querySelector("#typeEHeaderDiv").appendChild(typeEButton);


//make buttons dynamic
var buttonsClickNumMap = new Map([['A', 0], ['B', 0], ['C', 0], ['D', 0], ['E', 0]]);

for (var i = 0; i < 5; i++) {
    document.querySelectorAll(".show-type-button")[i].addEventListener('click', function() {
        var s = this.id.charAt(4);
        console.log("clicked button ID: " + s);
        if (buttonsClickNumMap.get(s)%2 == 0) {
            getBlock(s,'show');
            document.getElementById("type"+s+"Button").innerHTML = "Hide";
        } else {
            getBlock(s,'hide');
            document.getElementById("type"+s+"Button").innerHTML = "Show";
        }
        buttonsClickNumMap.set(s,buttonsClickNumMap.get(s) + 1);
    });
}

async function getBlock(globalCellType, showOrHide) {
    let jsonBlocks;
    try {
        var response = await fetch("/static/incorrect_image_paths.json");
        jsonBlocks = await response.text();
        var arr = jsonObjectContents(jsonBlocks);
        buildDoc(arr,globalCellType,showOrHide);
    } catch (e) {
        console.error(e);
    }
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

function buildDoc(arr,globalCellType,showOrHide) {
    if (arr.length-1 != 0) {
        for (var i = 0; i < arr.length-1; i++) {
            var newImg = document.createElement('img');
            newImg.id="resultsImg";
            var missedImagePath = arr[i];
            var imageNum = missedImagePath.substring(26,28);
            newImg.src = getMissedImageSrc(missedImagePath);
            placeInCorrectCategory(imageNum,newImg,globalCellType,showOrHide);            
        }
    } else {
        document.body.append("you got no images incorrect!");
    }
}

// functions to process data from JSON file
function getMissedImageSrc(missedImagePath) {
    missedImagePath = missedImagePath.substring(1);
    missedImagePath = missedImagePath.substring(0,missedImagePath.length-1);
    return missedImagePath;
}

function placeInCorrectCategory(imageNum,newImg,globalCellType,showOrHide) {
    if (Number(imageNum.charAt(0) == 0)) {
        var num = Number(imageNum.charAt(1));
        var localCellType = cellTypes[num];
    } else {
        var localCellType = cellTypes[imageNum];
    }
    if (localCellType == globalCellType) {
        var messageDiv = document.createElement('div');
        messageDiv.className = "message-div";
        messageDiv.id = "messageDiv";
        messageDiv.innerHTML = "You got image  " + imageNum + " incorrect";
        if (showOrHide == "show") {
            document.querySelector("#type"+localCellType+"ResultDiv").appendChild(messageDiv);
            document.querySelector("#type"+localCellType+"ResultDiv").appendChild(newImg);
        }
        if (showOrHide == "hide") {
            document.querySelector("#type"+localCellType+"ResultDiv").innerHTML = '';
        }
    }
}