// import npm modules
const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
let cellInfo = require("./cell_info");

// create express app
const app = express();

app.set('view engine', 'ejs');

app.use('/static', express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));

// const getAllFiles = function(dirPath, arrayOfFiles) {
//     files = fs.readdirSync(dirPath)
  
//     arrayOfFiles = arrayOfFiles || []
  
//     files.forEach(function(file) {
//       if (fs.statSync(dirPath + "/" + file).isDirectory()) {
//         arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
//       } else {
//         arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
//       }
//     })
  
//     return arrayOfFiles
// }

app.get("/", function(request,response) {
    // const result = getAllFiles("public");
    // var firstImagePath = result[0];
    // trimmedFirstImagePath = path.relative(__dirname + "/public",firstImagePath);
    // finalFirstImagePath = "\\static\\" + trimmedFirstImagePath;
    // console.log("trimmed path: " + finalFirstImagePath);
    // response.render("test", {firstImagePath: finalFirstImagePath});
    // response.sendFile(path.join(__dirname, '/image_test.html'));
    // response.render("test", {firstImagePath: cellInfo.img1Path, secondImagePath: cellInfo.image2secondImagePath});
    response.render("test", {firstImagePath: cellInfo.img1Path, secondImagePath: cellInfo.img2Path});
});

app.listen(process.env.PORT || 3000);

app.post("/", function(request,response) {
    var answerKey = [true,false,false,true];
    var userResponses = [];
    initUserResponses(request,userResponses);
    parseUserResponses(userResponses);
    response.render("results", {userScore: getUserScore(userResponses,answerKey)});
});

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

// gets the user's score based on their responses and the answer key
function getUserScore(userResponses,answerKey) {
    var userScore = userResponses.length/2;
    for (var i = 0; i < userResponses.length/2; i++) {
        if (userResponses[2*i] != answerKey[2*i] || 
            userResponses[2*i + 1] != answerKey[2*i + 1] ) {
            userScore--;
        }
    }
    return userScore;
}

