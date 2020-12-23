const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.set('view engine', 'ejs');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request,response) {
    response.sendFile(path.join(__dirname, '/image_test.html'));
});

<<<<<<< HEAD
app.listen(3000);
=======
app.listen(process.env.PORT || 3000);

app.post("/", function(request,response) {
    var answers = [true,false,false,true];
    var responses = [];
    responses[0] = String(request.body.yes0);
    responses[1] = String(request.body.no0);
    responses[2] = String(request.body.yes1);
    responses[3] = String(request.body.no1);
    // responses[4] = String(request.body.yes2);
    // responses[5] = String(request.body.no2);
    var invalidSubmission = checkInvalidSubmissions(responses);
    if (invalidSubmission) {
        response.send("Invalid submission. Please go back and confirm that you selected a single option for every image.");
    } else {
        var numCorrectResponses = calcNumCorrectResponses(responses,answers);
        response.render("results", {correctResponsesNum: numCorrectResponses});
    }
});

function checkInvalidSubmissions(responses) {
    for (var i = 0; i < 2; i++) {
        if (responses[2*i] != "undefined" && responses[2*i + 1] != "undefined") {
            return true;
        } else if (responses[2*i] == "undefined" && responses[2*i + 1] == "undefined") {
            return true;
        }
    }
    return false;
}

function calcNumCorrectResponses(responses,answers) {
    var numCorrectResponses = 2;
    for (var i = 0; i < 4; i++) {
        if (responses[i] == "undefined") {
            responses[i] = false;
        } else {
            responses[i] = true;
        }
    }
    
    //compare user responses to answer key

    for (var i = 0; i < 4; i++) {
        if (responses[2*i] != answers[2*i] || 
            responses[2*i + 1] != answers[2*i + 1] ) {
            numCorrectResponses--;
        }
    }
    return numCorrectResponses;
}
>>>>>>> serverResponse
