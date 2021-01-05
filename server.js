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
    jsonArrayPageOne.length = 0;
    driveApp(answer_key_page_one,request,1);
    response.redirect('/page_two');
});

app.get("/page_two", function(request,response) {
    response.sendFile(path.join(__dirname + '/page_two.html'));
});

app.post("/page_two", function(request,response) {
    var buttonClicked = request.body.button;
    jsonArrayPageTwo.length = 0;
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
    jsonArrayPageThree.length = 0;
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
    jsonArrayPageFour.length = 0;
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
    jsonArrayPageFive.length = 0;
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

var jsonArrayPageOne = [];
var jsonArrayPageTwo = [];
var jsonArrayPageThree = [];
var jsonArrayPageFour = [];
var jsonArrayPageFive = [];


function setMissedImagePaths(answerKey,userResponses,pageNumber) { 
    for (var i = 0; i < 10; i++) {
        if (answerKey[i] != userResponses[i] || userResponses[i] == null) {
            var wrongImageObject = {
                imagePath: '/static/cell_answers/cell' + String(pageNumber - 1) + String(i) + 'answer.JPG'
            }            
            if (pageNumber == 1) {
                jsonArrayPageOne.push(wrongImageObject);
            } else if (pageNumber == 2) {
                jsonArrayPageTwo.push(wrongImageObject);
            } else if (pageNumber == 3) {
                jsonArrayPageThree.push(wrongImageObject);
            } else if (pageNumber == 4) {
                jsonArrayPageFour.push(wrongImageObject);
            } else if (pageNumber == 5) {
                jsonArrayPageFive.push(wrongImageObject);
            }
        }
    }
}

function postMissedImagePaths() {
    var jsonString = "";
    jsonString = postMissedImagePathsHelper(jsonArrayPageOne, jsonString);
    jsonString = postMissedImagePathsHelper(jsonArrayPageTwo, jsonString);
    jsonString = postMissedImagePathsHelper(jsonArrayPageThree, jsonString);
    jsonString = postMissedImagePathsHelper(jsonArrayPageFour, jsonString);
    jsonString = postMissedImagePathsHelper(jsonArrayPageFive, jsonString);

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