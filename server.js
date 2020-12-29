// import npm modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const answer_key_page_one = require("./answer_key_page_one");
const answer_key_page_two = require("./answer_key_page_two");

// create express app
const app = express();

app.set('view engine', 'ejs');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

var jsonString = "";

app.get("/", function(request,response) {
    response.sendFile(path.join(__dirname + '/page_one.html'));
});

app.post("/", function(request,response) {
    driveApp(answer_key_page_one,request,0);
    response.redirect('/page_two');
});

app.get("/page_two", function(request,response) {
    response.sendFile(path.join(__dirname + '/page_two.html'));
});

app.post("/page_two", function(request,response) {
    driveApp(answer_key_page_two,request,5);
    writeMissedImagePaths();
    response.redirect('/results');
});

app.get("/results", function(request,response) {
    response.sendFile(path.join(__dirname + '/results.html'));
});

app.listen(process.env.PORT || 3000);

function driveApp(answerKeyPage,request,firstCellImageNumber) {
    var answerKey = createAnswerKey(answerKeyPage);
    var userResponses = [];
    var userResponses = initUserResponses(request);
    recordUserResponses(userResponses);
    getMissedImagePaths(answerKey, userResponses, firstCellImageNumber);
}

function createAnswerKey(answerKey) {
    var ansKey = answerKey.answerKey;
    var answers = [];
    for (var i = 0; i < ansKey.length; i++) {
        if (ansKey[i] === "y") {
            ansKey[i] = true;
        } else if (ansKey[i] === "n") {
            ansKey[i] = false;
        } 
    }
    return answers;
}

function checkAnswerKey(answerKey) {
    for (var i = 0; i < answerKey.length; i++) {
        try {

        } catch {
            
        }
    }
}

function initUserResponses(request) {
    return  [
                request.body.yes0,
                request.body.yes1,
                request.body.yes2,
                request.body.yes3,
                request.body.yes4
            ];
}

function recordUserResponses(userResponses) {
    for (var i = 0; i < userResponses.length; i++) {
        if (userResponses[i] == "on") {
            userResponses[i] = true;
        } else {
            userResponses[i] = false;
        }
    }
}

function getMissedImagePaths(answerKey,userResponses,firstCellImageNumber) { 
    for (var i = 0; i < 5; i++) {
        if (answerKey[i] != userResponses[i]) {
            var wrongObject = {
                imagePath: '/static/cell_answers/cell' + String(i + firstCellImageNumber) + 'answer.JPG'
            }
            jsonString += JSON.stringify(wrongObject);
        }
    }
}

function writeMissedImagePaths() {
    fs.writeFile('./public/incorrect_image_paths.json',jsonString, function(error) {
        if (error) {
            console.log(error);
        }
    })
}