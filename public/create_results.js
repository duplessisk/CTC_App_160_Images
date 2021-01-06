// create DIVs
var buttonTypeA = document.createElement('div');
buttonTypeA.className = "button_type";
buttonTypeA.id = "buttonTypeA";
document.body.appendChild(buttonTypeA);
var typeA = document.createElement('div');
typeA.id = "typeA";
typeA.className = "types";
document.body.appendChild(typeA);
var typeALabel = document.createTextNode("Type A Cell Results");
document.getElementById("buttonTypeA").appendChild(typeALabel);

var buttonTypeB = document.createElement('div');
buttonTypeB.className = "button_type";
buttonTypeB.id = "buttonTypeB";
document.body.appendChild(buttonTypeB);
var typeB = document.createElement('div');
typeB.id = "typeB";
typeB.className = "types";
document.body.appendChild(typeB);
var typeBLabel = document.createTextNode("Type B Cell Results");
document.getElementById("buttonTypeB").appendChild(typeBLabel);

var buttonTypeC = document.createElement('div');
buttonTypeC.className = "button_type";
buttonTypeC.id = "buttonTypeC";
document.body.appendChild(buttonTypeC);
var typeC = document.createElement('div');
typeC.id = "typeC";
typeC.className = "types";
document.body.appendChild(typeC);
var typeCLabel = document.createTextNode("Type C Cell Results");
document.getElementById("buttonTypeC").appendChild(typeCLabel);

var buttonTypeD = document.createElement('div');
buttonTypeD.className = "button_type";
buttonTypeD.id = "buttonTypeD";
document.body.appendChild(buttonTypeD);
var typeD = document.createElement('div');
typeD.id = "typeD";
typeD.className = "types";
document.body.appendChild(typeD);
var typeDLabel = document.createTextNode("Type D Cell Results");
document.getElementById("buttonTypeD").appendChild(typeDLabel);

var buttonTypeE = document.createElement('div');
buttonTypeE.className = "button_type";
buttonTypeE.id = "buttonTypeE";
document.body.appendChild(buttonTypeE);
var typeE = document.createElement('div');
typeE.id = "typeE";
typeE.className = "types";
document.body.appendChild(typeE);
var typeELabel = document.createTextNode("Type E Cell Results");
document.getElementById("buttonTypeE").appendChild(typeELabel);

// create buttons
var showTypeAButton = document.createElement('button');
showTypeAButton.innerHTML = "Show";
showTypeAButton.id = "showTypeAButton";
showTypeAButton.className = "show_type_button";
document.querySelector("#buttonTypeA").appendChild(showTypeAButton);

var showTypeBButton = document.createElement('button');
showTypeBButton.innerHTML = "Show";
showTypeBButton.id = "showTypeBButton";
showTypeBButton.className = "show_type_button";
document.querySelector("#buttonTypeB").appendChild(showTypeBButton);

var showTypeCButton = document.createElement('button');
showTypeCButton.innerHTML = "Show";
showTypeCButton.id = "showTypeCButton";
showTypeCButton.className = "show_type_button";
document.querySelector("#buttonTypeC").appendChild(showTypeCButton);

var showTypeDButton = document.createElement('button');
showTypeDButton.innerHTML = "Show";
showTypeDButton.id = "showTypeDButton";
showTypeDButton.className = "show_type_button";
document.querySelector("#buttonTypeD").appendChild(showTypeDButton);

var showTypeEButton = document.createElement('button');
showTypeEButton.innerHTML = "Show";
showTypeEButton.id = "showTypeEButton";
showTypeEButton.className = "show_type_button";
document.querySelector("#buttonTypeE").appendChild(showTypeEButton);

var buttonsClickNumMap = new Map([['A', 0], ['B', 0], ['C', 0], ['D', 0], ['E', 0]]);

var buttonTypeArray = [showTypeAButton.id,showTypeBButton.id,showTypeCButton.id,showTypeDButton.id,showTypeEButton.id];

for (var i = 0; i < buttonTypeArray.length; i++) {
    document.querySelectorAll(".show_type_button")[i].addEventListener('click', function() {
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

// removes quotations from each missed image path so the computer can access the file
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

// create cell types
var cellTypes = 
                [
/*0*/ 'A',
/*1*/ 'A',
/*2*/ 'A',
/*3*/ 'A',
/*4*/ 'A',             
/*5*/ 'A',
/*6*/ 'A',
/*7*/ 'A',
/*8*/ 'A',
/*9*/ 'A',

/*10*/ 'B',
/*11*/ 'B',
/*12*/ 'B',
/*13*/ 'B',
/*14*/ 'B',             
/*15*/ 'B',
/*16*/ 'B',
/*17*/ 'B',
/*18*/ 'B',
/*19*/ 'B',

/*20*/ 'C',
/*21*/ 'C',
/*22*/ 'C',
/*23*/ 'C',
/*24*/ 'C',             
/*25*/ 'C',
/*26*/ 'C',
/*27*/ 'C',
/*28*/ 'C',
/*29*/ 'C',

/*30*/ 'D',
/*31*/ 'D',
/*32*/ 'D',
/*33*/ 'D',
/*34*/ 'D',             
/*35*/ 'D',
/*36*/ 'D',
/*37*/ 'D',
/*38*/ 'D',
/*39*/ 'D',

/*40*/ 'E',
/*41*/ 'E',
/*42*/ 'E',
/*43*/ 'E',
/*44*/ 'E',             
/*45*/ 'E',
/*46*/ 'E',
/*47*/ 'E',
/*48*/ 'E',
/*49*/ 'E',

                ];