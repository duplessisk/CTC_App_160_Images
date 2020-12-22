const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request,response) {
    response.sendFile(path.join(__dirname, '/image_test.html'));
});

app.listen(3000);

app.post("/", function(request,response) {
    var responses = [];
    responses[0] = String(request.body.yes0);
    responses[1] = String(request.body.no0);
    responses[2] = String(request.body.yes1);
    responses[3] = String(request.body.no1);
    responses[4] = String(request.body.yes2);
    responses[5] = String(request.body.no2);
    var numCorrectResponses = calcNumCorrectResponses(responses);
    response.send("The result is: " + numCorrectResponses);

});

function calcNumCorrectResponses(responses) {
    var numCorrectResponses = 3;
    var answers = [true,false,true,false,true,false];
    for (var i = 0; i < 6; i++) {
        // console.log(responses[i]);
        if (responses[i] == "undefined") {
            responses[i] = false;
            // console.log("I'm in false")
        } else {
            responses[i] = true;
            // console.log("I'm in true")
        }
    }
    
    //compare user responses to answer key
    console.log("responses: " + responses.toString());
    console.log("answers: " + answers.toString());

    for (var i = 0; i < 3; i++) {
        if (responses[2*i] != answers[2*i] || 
            responses[2*i + 1] != answers[2*i + 1] ) {
            numCorrectResponses--;
        }
    }
    return numCorrectResponses;
}