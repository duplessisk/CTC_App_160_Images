// import npm modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const answerKeyPage1 = require("./answerKeyPage1");
const answerKeyPage2 = require("./answerKeyPage2");

// create express app
const app = express();

app.set('view engine', 'ejs');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

var jsonString = "";

app.get("/", function(request,response) {
    response.sendFile(path.join(__dirname + '/page1.html'));
});

app.post("/", function(request,response) {
    console.log();
    console.log("on page 1");
    var answerKey1 = createAnswerKey(answerKeyPage1);
    var userResponses = [];
    initUserResponses(request,userResponses);
    parseUserResponses(userResponses);
    getMissedImagePaths(answerKey1, userResponses, 0, answerKey1.length/2 - 1);
    response.redirect('/page2');
});

app.get("/page2", function(request,response) {
    response.sendFile(path.join(__dirname + '/page2.html'));
});

app.post("/page2", function(request,response) {
    console.log();
    console.log("on page 2");
    var answerKey2 = createAnswerKey(answerKeyPage2);
    var userResponses = [];
    initUserResponses(request,userResponses);
    parseUserResponses(userResponses);
    getMissedImagePaths(answerKey2, userResponses, answerKey2.length/2, answerKey2.length - 1);
    writeMissedImagePaths();
    response.redirect('/results');
});

app.get("/results", function(request,response) {
    response.sendFile(path.join(__dirname + '/results.html'));
});

app.listen(process.env.PORT || 3000);

function createAnswerKey(answerKey) {
    var ansKey = answerKey.answerKey;
    var answers = [];
    for (var i = 0; i < ansKey.length; i++) {
        if (ansKey[i] === "y") {
            answers.push(true);
            answers.push(false);
        } else if (ansKey[i] === "n") {
            answers.push(false);
            answers.push(true);
        }
    }
    return answers;
}

function initUserResponses(request,userResponses) {
    // var names = [request.body.yes0,request.body.no0,request.body.yes1,request.body.no1];
    var names = [request.body.yes0,request.body.no0];
    for (var i = 0; i < names.length; i++) {
        userResponses[i] = String(names[i]);
    }
}

// convert user responses to booleans that can be compared against the answer key
function parseUserResponses(userResponses) {
    for (var i = 0; i < userResponses.length; i++) {
        if (userResponses[i] == "undefined") {
            userResponses[i] = false;
        } else {
            userResponses[i] = true;
        }
    }
}

function getMissedImagePaths(answerKey,userResponses,start,end) { 
    for (var i = start; i <= end; i++) {
        console.log("i: " + i);
        console.log("answerKey: " + answerKey);
        console.log("userResponses: " + userResponses);
        console.log();
        if (answerKey[2*(i-start)] != userResponses[2*(i-start)] || answerKey[2*(i-start) + 1] != userResponses[2*(i-start) + 1]) {
            //write image path to JSON file
            var wrongObject = {
                imagePath: '/static/cell_images/cell' + String(i) + '.JPG'
            }
            jsonString += JSON.stringify(wrongObject);
            console.log(jsonString);
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