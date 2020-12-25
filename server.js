// import npm modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");

// create express app
const app = express();

app.set('view engine', 'ejs');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request,response) {
    response.sendFile(path.join(__dirname + '/test.html'));
});

app.listen(process.env.PORT || 3000);

app.post("/", function(request,response) {
    var answerKey = [true,false,false,true];
    var userResponses = [];
    initUserResponses(request,userResponses);
    parseUserResponses(userResponses);
    processWrongAnswers(answerKey,userResponses);
    response.sendFile(path.join(__dirname + '/results.html'));
});

function processWrongAnswers(answerKey,userResponses) {
    var jsonString = "";
    for (var i = 0; i < answerKey.length/2; i++) {
        console.log("i: " + i);
        console.log("answerKey[i]: " + answerKey[i]);
        console.log("userResponses[i]: " + userResponses[i] );
        console.log("answerKey[i+1]: " + answerKey[i+1]);
        console.log("userResponses[i+1]: " + userResponses[i+1]);
        console.log();
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

function initUserResponses(request,userResponses) {
    var names = [request.body.yes0,request.body.no0,request.body.yes1,request.body.no1];
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