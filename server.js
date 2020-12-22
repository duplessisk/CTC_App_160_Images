const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

const app = express();

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(request,response) {
    response.sendFile(path.join(__dirname, '/image_test.html'));
});

app.post("/", function(request,response) {
    var yes0 = request.body.yes0;
    var no0 = request.body.no0;
    var yes1 = request.body.yes1;
    var no1 = request.body.no1;
    var yes2 = request.body.yes2;
    var no2 = request.body.no2;
    response.send("The result is: " + yes0);
});

var numYesCheckBoxes = document.querySelectorAll(".yescheckboxes").length;
var numNoCheckBoxes = document.querySelectorAll(".nocheckboxes").length;

var responses = new Array(6);
var answers = [true,null,true,null,true,null];

for (var i = 0; i < responses.length; i++) {
    responses[i] = null;
    console.log(responses[i]);
}

// yes-check-boxes event listener
for (var i = 0; i < numYesCheckBoxes; i++) {
    document.querySelectorAll(".yescheckboxes")[i].addEventListener('change', function() {
        if (this.checked) {
            responses[2*this.id] = true;
        } else {
            responses[2*this.id] = null;
        }
        console.log(responses);
    });
}

// no-check-boxes event listener 
for (var i = 0; i < numNoCheckBoxes; i++) {
    document.querySelectorAll(".nocheckboxes")[i].addEventListener('change', function() {
        if (this.checked) {
            responses[2*this.id + 1] = true;
        } else {
            responses[2*this.id + 1] = null;
        }
        console.log(responses);
    });
}

// submit button event listener
document.querySelector('.submitbutton').addEventListener('click', function() {
    var formFinished = true;
    var noDoubleChecks = true;
    formFinished = checkFormFinished(formFinished);
    noDoubleChecks = checkDoubleChecks(noDoubleChecks);
    if (formFinished && noDoubleChecks) {
        var totalScore = 3;
        // check for checked no-check-boxes
        for (var i = 0; i < responses.length/2; i++) {
            if (responses[2*i + 1] != answers[2*i + 1]) {
                totalScore--;
            }
            // if (responses[(2*i)+1]) {
            //     totalScore--;
            // }
        }
        localStorage.setItem("numCorrect",totalScore);
        window.document.location = "results.html";
    } else if (!formFinished) {
        alert("Please submit a response for all images");
    } else {
        alert("Please submit one response per image");
    }
});

function checkFormFinished(formFinished) {
    for (var i = 0; i < responses.length/2; i++) {
        var yesResponse = responses[2*i];
        var noResponse = responses[2*i + 1];
        if (yesResponse == null && noResponse == null) {
            formFinished = false;
        } 
    }
    return formFinished;
}

function checkDoubleChecks(noDoubleChecks) {
    for (var i = 0; i < responses.length/2; i++) {
        var yesResponse = responses[2*i];
        var noResponse = responses[2*i + 1];
        if (yesResponse != null && noResponse != null) {
            noDoubleChecks = false;
        } 
    }
    return noDoubleChecks;
}

app.listen(3000);