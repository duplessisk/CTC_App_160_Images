// import  npm modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const answer_key_page_one = require("./answer_key_page_one");
const answer_key_page_two = require("./answer_key_page_two");
const answer_key_page_three = require("./answer_key_page_three");
const answer_key_page_four = require("./answer_key_page_four");
const answer_key_page_five = require("./answer_key_page_five");
const cellTypes = require("./cell_types");


// create express app
const app = express();

app.set('view engine', 'ejs');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

var previouslySubmitted = false;

app.get("/", function(request,response) {
    previouslySubmitted = false;
    response.sendFile(path.join(__dirname + '/welcome_page.html'));
});

app.post("/welcome_page", function(request,response) {
    response.redirect('/instructions_page');
});

app.get("/instructions_page", function(request,response) {
    response.sendFile(path.join(__dirname + '/instructions_page.html'));
});

app.post("/instructions_page", function(request,response) {
    response.redirect('/page_one');
});

app.get("/page_one", function(request,response) {
    response.sendFile(path.join(__dirname + '/page_one.html'));
});

app.post("/page_one", function(request,response) {
    jsonArrayPages[0].length = 0;
    driveApp(answer_key_page_one,request,1);
    response.redirect('/page_two');
});

app.get("/page_two", function(request,response) {
    response.sendFile(path.join(__dirname + '/page_two.html'));
});

app.post("/page_two", function(request,response) {
    var buttonClicked = request.body.button;
    jsonArrayPages[1].length = 0;
    driveApp(answer_key_page_two,request,2);
    if (buttonClicked == "Previous") {
        response.redirect('/page_one');
    } else if (buttonClicked == "Next") {
        response.redirect('/page_three');
    }
});

app.get("/page_three", function(request,response) {
    response.sendFile(path.join(__dirname + '/page_three.html'));
});

app.post("/page_three", function(request,response) {
    var buttonClicked = request.body.button;
    jsonArrayPages[2].length = 0;
    driveApp(answer_key_page_three,request,3);
    if (buttonClicked == "Previous") {
        response.redirect('/page_two');
    } else if (buttonClicked == "Next") {
        response.redirect('/page_four');
    }
});

app.get("/page_four", function(request,response) {
    response.sendFile(path.join(__dirname + '/page_four.html'));
});

app.post("/page_four", function(request,response) {
    var buttonClicked = request.body.button;
    jsonArrayPages[3].length = 0;
    driveApp(answer_key_page_four,request,4);
    if (buttonClicked == "Previous") {
        response.redirect('/page_three');
    } else if (buttonClicked == "Next") {
        response.redirect('/page_five');
    }
});

app.get("/page_five", function(request,response) {
    response.sendFile(path.join(__dirname + '/page_five.html'));
});

app.post("/page_five", function(request,response) {
    var buttonClicked = request.body.button;
    jsonArrayPages[4].length = 0;
    driveApp(answer_key_page_five,request,5);
    if (buttonClicked == "Previous") {
        response.redirect('/page_four');
    } else if (buttonClicked == "Continue") {
        response.redirect('/review');
    }
});

app.get("/review", function(request,response) {
    response.sendFile(path.join(__dirname + '/review.html'));
});

app.post("/review", function(request,response) {
    if (previouslySubmitted) {
        response.redirect('/form_already_submitted_page');
    } else {
        var buttonClicked = request.body.button;
        if (buttonClicked == "Previous") {
            response.redirect('/page_five');
        } else {
            previouslySubmitted = true;
            // postAllImagePaths();
            postMissedImagePaths();
            postResultsData();
            response.redirect('/results');
        }
    }
});

app.get("/results", function(request,response) {
    response.sendFile(path.join(__dirname + '/results.html'));
});

app.get("/form_already_submitted_page", function(request,response) {
    response.sendFile(path.join(__dirname + '/form_already_submitted_page.html'));
});

app.listen(process.env.PORT || 3000);

// functions
function driveApp(answerKeyPage,request,pageNumber) {
    var answerKey = createAnswerKey(answerKeyPage);
    var userResponses = initUserResponses(request);
    recordUserResponses(userResponses);
    setMissedImagePaths(answerKey, userResponses, pageNumber);
}

function createAnswerKey(answerKey) {
    var ansKey = answerKey.answerKey;
    var answerKey = [];
    for (var i = 0; i < ansKey.length; i++) {
        if (ansKey[i] == "y") {
            answerKey[i] = true;
        } else {
            answerKey[i] = false;
        }
    }
    return answerKey;
}

function initUserResponses(request) {
    return [
        request.body.radio0,
        request.body.radio1,
        request.body.radio2,
        request.body.radio3,
        request.body.radio4,
        request.body.radio5,
        request.body.radio6,
        request.body.radio7,
        request.body.radio8,
        request.body.radio9
    ]
}

function recordUserResponses(userResponses) {
    for (var i = 0; i < userResponses.length; i++) {
        if (userResponses[i] == "yes") {
            userResponses[i] = true;
        } else if (userResponses[i] == "no")  {
            userResponses[i] = false;
        } else {
            userResponses[i] = null;
        }
    }
}

// Stores path of each image the user answered incorrectly by page 
//            page  :  1,   2,   3,   4,   5
var jsonArrayPages = [ [] , [] , [] , [] , [] ];

function setMissedImagePaths(answerKey,userResponses,pageNumber) { 
    for (var i = 0; i < 10; i++) {
        if (answerKey[i] != userResponses[i] || userResponses[i] == null) {     
            var wrongImageObject = {
                imagePath: '/static/cell_answers/cell' + String(pageNumber - 1) + String(i) + 'answer.JPG'
            }      
            jsonArrayPages[pageNumber - 1].push(JSON.stringify(wrongImageObject,null,4));
        }
    }
}

// Stores the path of each image the user answered incorrectly by cell type bin
var jsonMapPages = new Map([['A', ""], ['B', ""], ['C', ""], ['D', ""], ['E', ""]]);

/**
 * Organizes and posts image paths associated with an incorrect user answer into the appropriate cell type bins
 */
function postMissedImagePaths() {
    setJsonMapPages();
    writeMissedCellTypeFiles();
}

/**
 * Puts paths of images the user got incorrect in the appropriate cell-type bin
 */
function setJsonMapPages() {
    allCellTypes = cellTypes.cellTypes;
    for (var i = 0; i < jsonArrayPages.length; i++) {
        for (var j = 0; j < jsonArrayPages[i].length; j++) {
            var missedImagePath = jsonArrayPages[i][j];
            var thisCellType = getThisCellType(missedImagePath,allCellTypes);
            // adds one to the total number incorrect for this particular cell type
            totalIncorrectByType.set(thisCellType,totalIncorrectByType.get(thisCellType) + 1);
            jsonMapPages.set(thisCellType, jsonMapPages.get(thisCellType) + jsonArrayPages[i][j]);
        }
    } 
}

/**
 * Gets the cell type for the image the user answered incorrectly
 * @param {String} missedImagePath - Path for image that the user answered incorrectly
 * @param {Array} allCellTypes - Array containing the cell types for each image
 */
function getThisCellType(missedImagePath,allCellTypes) {
    var missedImageNum = missedImagePath.substring(45,47);
    if (Number(missedImageNum.charAt(0) == 0)) {
        var num = Number(missedImageNum.charAt(1));
        return allCellTypes[num];
    } else {
        return allCellTypes[Number(missedImageNum)];
    }
}

/**
 * Writes and posts JSON files (seperate file for each cell type bin) containing the user's incorrect answers.
 */
function writeMissedCellTypeFiles() {
    var possibleCellTypes = ["A","B","C","D","E"];
    for (var pageNum = 1; pageNum <= 5; pageNum++) {
        fs.writeFile("./public/incorrect_image_paths_" + possibleCellTypes[pageNum - 1] + ".json",
        jsonMapPages.get(possibleCellTypes[pageNum - 1]),
        function(error) {
            if (error) {
                console.log(error);
            }
        });
    }
}

/**
 * Posts a breakdown of the user's performance overall and within each cell type on the exam. 
 */
function postResultsData() {
    var totalIncorrectString = setTotalIncorrect();
    var totalIncorrectByTypeString = setTotalIncorrectByType();
    var totalNumEachType = setNumEachType();
    fs.writeFile("./public/results_data.json", 
        "[" + "\n" + 
            totalIncorrectString + "," + "\n" + 
            totalIncorrectByTypeString + "," + "\n" + 
            totalNumEachType + "\n" + 
        "]", function() {
    });
}

/**
 * Gets the user's total number of incorrect responses 
 */
function setTotalIncorrect() {
    var totalIncorrect = 0;
    for (var pageNum = 1; pageNum <= 5; pageNum++) {
        totalIncorrect += jsonArrayPages[pageNum-1].length;
    }
    var totalIncorrectObject = {
        totalIncorrect: '' + totalIncorrect + ''
    } 
    return JSON.stringify(totalIncorrectObject,null,4);
}

// stores number of each cell type user got incorrect
var totalIncorrectByType = new Map([['A', 0], ['B', 0], ['C', 0], ['D', 0], ['E', 0]]);

/**
 * Sets the user's total number of incorrect responses by cell type
 */
function setTotalIncorrectByType() {
    var possibleCellTypes = ["A","B","C","D","E"];
    var totalIncorrectByTypeObject = {};
    var totalIncorrectByTypeKeys = Array.from(totalIncorrectByType.keys());
    for (var i = 0; i < totalIncorrectByTypeKeys.length; i++) {
        var specificTypeTotalIncorrect = totalIncorrectByType.get(possibleCellTypes[i]);
        totalIncorrectByTypeObject["numIncorrectType" + possibleCellTypes[i] + ""] = specificTypeTotalIncorrect;
    }
    return JSON.stringify(totalIncorrectByTypeObject,null,4);
}

// stores total number of each cell type
var numEachType = new Map([['A', 0], ['B', 0], ['C', 0], ['D', 0], ['E', 0]]);

/**
 * Sets the number of questions for each cell type.
 */
function setNumEachType() {
    allCellTypes = cellTypes.cellTypes;

    // initialize numEachType 
    for (var i = 0; i < allCellTypes.length; i++) {
        numEachType.set(allCellTypes[i] , numEachType.get(allCellTypes[i]) + 1);
    }

    // post numEachType contents
    var possibleCellTypes = ["A","B","C","D","E"];
    var numEachTypeObject = {};
    var numEachTypeKeys = Array.from(numEachType.keys());
    for (var i = 0; i < numEachTypeKeys.length; i++) {
        var specificNumEachType = numEachType.get(possibleCellTypes[i]);
        numEachTypeObject["totalNumType" + possibleCellTypes[i] + ""] = specificNumEachType;
    }
    return JSON.stringify(numEachTypeObject,null,4);
}