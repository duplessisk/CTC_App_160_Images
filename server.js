// import npm modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const answerKey = require("./answerKey");

// create express app
const app = express();

app.set('view engine', 'ejs');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request,response) {
    console.log("I'm in get /");
    response.sendFile(path.join(__dirname + '/page1.html'));
});

app.post("/", function(request,response) {
    console.log("I'm in post /");
    var answerKey = createAnswerKey();
    var userResponses = [];
    initUserResponses(request,userResponses);
    parseUserResponses(userResponses);
    writeMissedImagePaths(answerKey,userResponses);
    response.redirect('/page2');
    // response.sendFile(path.join(__dirname + '/results.html'));
});

app.get("/page2", function(request,response) {
    console.log("I'm in get /page2");
    response.sendFile(path.join(__dirname + '/page2.html'));
});

app.post("/page2", function(request,response) {
    console.log("I'm in post /page2");
    var answerKey = createAnswerKey();
    var userResponses = [];
    initUserResponses(request,userResponses);
    parseUserResponses(userResponses);
    writeMissedImagePaths(answerKey,userResponses);
    response.redirect('/results');
});

app.get("/results", function(request,response) {
    console.log("I'm in post /page2/results");-+
    response.sendFile(path.join(__dirname + '/results.html'));
});

app.listen(process.env.PORT || 3000);

function createAnswerKey() {
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

function writeMissedImagePaths(answerKey,userResponses) {
    var jsonString = "";
    for (var i = 0; i < answerKey.length/2; i++) {
        if (answerKey[2*i] != userResponses[2*i] || answerKey[2*i + 1] != userResponses[2*i + 1]) {
            //write image path to JSON file
            var wrongObject = {
                imagePath: '/static/cell_images/cell' + String(i) + '.JPG'
            }
            jsonString += JSON.stringify(wrongObject);
        }
    }
    fs.writeFile('./public/incorrect_image_paths.json',jsonString, function(error) {
        if (error) {
            console.log(error);
        }
    })
}