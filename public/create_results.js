// create cell types
var cellTypes = ['A','A','A','A','A','A','A','A','A','A',
                 'B','B','B','B','B','B','B','B','B','B',
                 'C','C','C','C','C','C','C','C','C','C',
                 'D','D','D','D','D','D','D','D','D','D',
                 'E','E','E','E','E','E','E','E','E','E',
                ];

// create DIVs
var buttonTypeA = document.createElement('div');
buttonTypeA.className = "button_type";
buttonTypeA.id = "buttonTypeA";
document.body.appendChild(buttonTypeA);
var typeA = document.createElement('div');
typeA.id = "typeA";
typeA.className = "types";
document.body.appendChild(typeA);
var typeALabel = document.createElement('p');
typeALabel.innerHTML = "Type A Cell Results";
typeALabel.className = "label-types";
document.getElementById("buttonTypeA").appendChild(typeALabel);

var buttonTypeB = document.createElement('div');
buttonTypeB.className = "button_type";
buttonTypeB.id = "buttonTypeB";
document.body.appendChild(buttonTypeB);
var typeB = document.createElement('div');
typeB.id = "typeB";
typeB.className = "types";
document.body.appendChild(typeB);
var typeBLabel = document.createElement('p');
typeBLabel.innerHTML = "Type B Cell Results";
typeBLabel.className = "label-types";
document.getElementById("buttonTypeB").appendChild(typeBLabel);

var buttonTypeC = document.createElement('div');
buttonTypeC.className = "button_type";
buttonTypeC.id = "buttonTypeC";
document.body.appendChild(buttonTypeC);
var typeC = document.createElement('div');
typeC.id = "typeC";
typeC.className = "types";
document.body.appendChild(typeC);
var typeCLabel = document.createElement('p');
typeCLabel.innerHTML = "Type C Cell Results";
typeCLabel.className = "label-types";
document.getElementById("buttonTypeC").appendChild(typeCLabel);

var buttonTypeD = document.createElement('div');
buttonTypeD.className = "button_type";
buttonTypeD.id = "buttonTypeD";
document.body.appendChild(buttonTypeD);
var typeD = document.createElement('div');
typeD.id = "typeD";
typeD.className = "types";
document.body.appendChild(typeD);
var typeDLabel = document.createElement('p');
typeDLabel.innerHTML = "Type D Cell Results";
typeDLabel.className = "label-types";
document.getElementById("buttonTypeD").appendChild(typeDLabel);

var buttonTypeE = document.createElement('div');
buttonTypeE.className = "button_type";
buttonTypeE.id = "buttonTypeE";
document.body.appendChild(buttonTypeE);
var typeE = document.createElement('div');
typeE.id = "typeE";
typeE.className = "types";
document.body.appendChild(typeE);
var typeELabel = document.createElement('p');
typeELabel.innerHTML = "Type E Cell Results";
typeELabel.className = "label-types";
document.getElementById("buttonTypeE").appendChild(typeELabel);

// create buttons
var showTypeAButton = document.createElement('button');
showTypeAButton.innerHTML = "Show";
showTypeAButton.id = "showTypeAButton";
showTypeAButton.className = "show-type-button";
document.querySelector("#buttonTypeA").appendChild(showTypeAButton);

var showTypeBButton = document.createElement('button');
showTypeBButton.innerHTML = "Show";
showTypeBButton.id = "showTypeBButton";
showTypeBButton.className = "show-type-button";
document.querySelector("#buttonTypeB").appendChild(showTypeBButton);

var showTypeCButton = document.createElement('button');
showTypeCButton.innerHTML = "Show";
showTypeCButton.id = "showTypeCButton";
showTypeCButton.className = "show-type-button";
document.querySelector("#buttonTypeC").appendChild(showTypeCButton);

var showTypeDButton = document.createElement('button');
showTypeDButton.innerHTML = "Show";
showTypeDButton.id = "showTypeDButton";
showTypeDButton.className = "show-type-button";
document.querySelector("#buttonTypeD").appendChild(showTypeDButton);

var showTypeEButton = document.createElement('button');
showTypeEButton.innerHTML = "Show";
showTypeEButton.id = "showTypeEButton";
showTypeEButton.className = "show-type-button";
document.querySelector("#buttonTypeE").appendChild(showTypeEButton);


//make buttons dynamic
var buttonsClickNumMap = new Map([['A', 0], ['B', 0], ['C', 0], ['D', 0], ['E', 0]]);

var buttonTypeArray = [showTypeAButton.id,showTypeBButton.id,showTypeCButton.id,showTypeDButton.id,showTypeEButton.id];

for (var i = 0; i < buttonTypeArray.length; i++) {
    document.querySelectorAll(".show-type-button")[i].addEventListener('click', function() {
        var s = this.id.charAt(8);
        if (buttonsClickNumMap.get(s)%2 == 0) {
            getBlock(s,'show');
            document.getElementById("showType"+s+"Button").innerHTML = "Hide";
        } else {
            getBlock(s,'hide');
            document.getElementById("showType"+s+"Button").innerHTML = "Show";
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
            document.querySelector("#type"+localCellType+"").appendChild(messageDiv);
            document.querySelector("#type"+localCellType+"").appendChild(newImg);
        }
        if (showOrHide == "hide") {
            document.querySelector("#type"+localCellType+"").innerHTML = '';
        }
    }
} 


