var typeA = document.createElement('div');
typeA.id = "typeA";
typeA.className = "types";
document.body.appendChild(typeA);

var typeB = document.createElement('div');
typeB.id = "typeB";
typeB.className = "types";
document.body.appendChild(typeB);

var typeC = document.createElement('div');
typeC.id = "typeC";
typeC.className = "types";
document.body.appendChild(typeC);

var typeD = document.createElement('div');
typeD.id = "typeD";
typeD.className = "types";
document.body.appendChild(typeD);

var typeE = document.createElement('div');
typeE.id = "typeE";
typeE.className = "types";
document.body.appendChild(typeE);

// create buttons
var showTypeAButton = document.createElement('button');
showTypeAButton.innerHTML = "missed typeA";
showTypeAButton.id = "showTypeAButton";
showTypeAButton.className = "showTypeButton";
document.querySelector("#typeA").appendChild(showTypeAButton);

var showTypeBButton = document.createElement('button');
showTypeBButton.innerHTML = "missed typeB";
showTypeBButton.id = "showTypeBButton";
showTypeBButton.className = "showTypeButton";
document.querySelector("#typeB").appendChild(showTypeBButton);

var showTypeCButton = document.createElement('button');
showTypeCButton.innerHTML = "missed typeC";
showTypeCButton.id = "showTypeCButton";
showTypeCButton.className = "showTypeButton";
document.querySelector("#typeC").appendChild(showTypeCButton);

var showTypeDButton = document.createElement('button');
showTypeDButton.innerHTML = "missed typeD";
showTypeDButton.id = "showTypeDButton";
showTypeDButton.className = "showTypeButton";
document.querySelector("#typeD").appendChild(showTypeDButton);

var showTypeEButton = document.createElement('button');
showTypeEButton.innerHTML = "missed typeE";
showTypeDButton.id = "showTypeEButton";
showTypeEButton.className = "showTypeButton";
document.querySelector("#typeE").appendChild(showTypeEButton);

var buttonTypeArray = ["#showTypeAButton","#showTypeBButton","#showTypeCButton","#showTypeDButton","#showTypeEButton"];

for (var i = 0; i < 1; i++) {
    document.querySelector("#showTypeAButton").addEventListener('click', function() {
        getBlock();
    });
}

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
}

// getBlock();

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
            var newImg = document.createElement('img');
            newImg.id="resultsImg";
            var missedImagePath = arr[i];
            var imageNum = missedImagePath.substring(26,28);
            newImg.src = getMissedImageSrc(missedImagePath);
            placeInCorrectCategory(imageNum,newImg);            
        }
    } else {
        document.body.append("you got no images incorrect!");
    }
}

function placeInCorrectCategory(imageNum,newImg) {
    if (imageNum.charAt(0) == 'a') {
        imageNum = imageNum.charAt(1);
    } 
    imageNum = Number(imageNum);
    var cellType = cellTypes[imageNum];
    var messageDiv = document.createElement('div');
    messageDiv.className = "message-div";
    messageDiv.innerHTML = "You got image  " + imageNum + " incorrect";
    document.querySelector("#type"+cellType+"").append(messageDiv);
    document.querySelector("#type"+cellType+"").appendChild(newImg);
}

// removes quotations from each missed image path so the computer can access the file
function getMissedImageSrc(missedImagePath) {
    missedImagePath = missedImagePath.substring(1);
    missedImagePath = missedImagePath.substring(0,missedImagePath.length-1);
    return missedImagePath;
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
