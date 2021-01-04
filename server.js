console.log("server restarted");

// import  npm modules
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

var previouslySubmitted = false;

app.get("/", function(request,response) {
    previouslySubmitted = false;
    response.sendFile(path.join(__dirname + '/intro_page.html'));
});

app.post("/intro_page", function(request,response) {
    response.redirect('/page_one');
});

app.get("/page_one", function(request,response) {
    response.sendFile(path.join(__dirname + '/page_one.html'));
});

app.post("/page_one", function(request,response) {
    jsonArrayPageOne.length = 0;
    driveApp(answer_key_page_one,request,0);
    response.redirect('/page_two');
});

app.get("/page_two", function(request,response) {
    response.sendFile(path.join(__dirname + '/page_two.html'));
});

app.post("/page_two", function(request,response) {
    var buttonClicked = request.body.button;
    jsonArrayPageTwo.length = 0;
    driveApp(answer_key_page_two,request,5);
    if (buttonClicked == "Previous") {
        response.redirect('/page_one');
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
        previouslySubmitted = true;
        var buttonClicked = request.body.button;
        if (buttonClicked == "Previous") {
            response.redirect('/page_two');
        } else {
            postMissedImagePaths();
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
function driveApp(answerKeyPage,request,firstCellImageNumber) {
    var answerKey = createAnswerKey(answerKeyPage);
    var userResponses = initUserResponses(request);
    recordUserResponses(userResponses);
    setMissedImagePaths(answerKey, userResponses, firstCellImageNumber);
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
        request.body.radio4
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

var jsonArrayPageOne = [];
var jsonArrayPageTwo = [];

function setMissedImagePaths(answerKey,userResponses,firstCellImageNumber) { 
    for (var i = 0; i < 5; i++) {
        if (answerKey[i] != userResponses[i] || userResponses[i] == null) {
            var wrongImageObject = {
                imagePath: '/static/cell_answers/cell' + String(i + firstCellImageNumber) + 'answer.JPG'
            }            
            if (firstCellImageNumber == 0) {
                jsonArrayPageOne.push(wrongImageObject);
            } else if (firstCellImageNumber == 5) {
                jsonArrayPageTwo.push(wrongImageObject);
            }
        }
    }
}

function postMissedImagePaths() {
    var jsonString = "";
    jsonString = postMissedImagePathsHelper(jsonArrayPageOne, jsonString);
    jsonString = postMissedImagePathsHelper(jsonArrayPageTwo, jsonString);
    fs.writeFile('./public/incorrect_image_paths.json', jsonString, function(error) {
        if (error) {
            console.log(error);
        }
    })
}

function postMissedImagePathsHelper(jsonArray, jsonString) {
    for (var i = 0; i < jsonArray.length; i++) {
        jsonString += JSON.stringify(jsonArray[i]);
    }
    return jsonString;
}

