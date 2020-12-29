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
    var answerKey1 = createAnswerKey(answer_key_page_one);
    var userResponses = [];
    initUserResponses(request,userResponses);
    recordUserResponses(userResponses);
    getMissedImagePaths(answerKey1, userResponses, 0, answerKey1.length/2 - 1);
    response.redirect('/page_two');
});

app.get("/page_two", function(request,response) {
    response.sendFile(path.join(__dirname + '/page_two.html'));
});

app.post("/page_two", function(request,response) {
    var answerKey2 = createAnswerKey(answer_key_page_two);
    var userResponses = [];
    initUserResponses(request,userResponses);
    recordUserResponses(userResponses);
    getMissedImagePaths(answerKey2, userResponses, answerKey2.length/2, answerKey2.length - 1);
    console.log("page2: ");
    console.log("userResponses: " + userResponses);
    console.log("answerKey: " + answerKey2);
    console.log("jsonString: " + jsonString);
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
    var names = [request.body.yes0,request.body.no0,
                 request.body.yes1,request.body.no1,
                 request.body.yes2,request.body.no2,
                 request.body.yes3,request.body.no3,
                 request.body.yes4,request.body.no4];
    for (var i = 0; i < names.length; i++) {
        userResponses[i] = String(names[i]);
    }
}

// convert user responses to booleans that can be compared against the answer key
function recordUserResponses(userResponses) {
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
        if (answerKey[2*(i-start)] != userResponses[2*(i-start)] || answerKey[2*(i-start) + 1] != userResponses[2*(i-start) + 1]) {
            //write image path to JSON file
            var wrongObject = {
                imagePath: '/static/cell_answers/cell' + String(i) + 'answer.JPG'
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