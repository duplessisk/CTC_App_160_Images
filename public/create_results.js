// create cell types
var cellTypes = ['A','A','A','A','A','A','A','A','A','A',
                 'B','B','B','B','B','B','B','B','B','B',
                 'C','C','C','C','C','C','C','C','C','C',
                 'D','D','D','D','D','D','D','D','D','D',
                 'E','E','E','E','E','E','E','E','E','E',
                ];

// create DIVs with correct structure
var tempTypes = ["A","B","C","D","E"];
for (var i = 0; i < 5; i++) {
    // typeHeader DIVs
    typeHeaderDiv = document.createElement('div');
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

// create buttons
for (var i = 0; i < 5; i++) {
    var typeButton = document.createElement('button');
    typeButton.innerHTML = "Show";
    typeButton.id = "type"+tempTypes[i]+"Button";
    typeButton.className = "show-type-button";
    document.querySelector("#type"+tempTypes[i]+"HeaderDiv").appendChild(typeButton);
}

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