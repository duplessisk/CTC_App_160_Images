const express = require("express");
const mongoose = require('mongoose');
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const answerKeys = require("./object_types");
const objectTypes = require("./object_types");
const nodemailer = require("nodemailer");
require("dotenv").config();

const app = express();

app.set('view engine', 'ejs');

app.use('/static', express.static('client_side_code'));
app.use(bodyParser.urlencoded({extended: true}));

mongoose.connect("mongodb://localhost:27017/ctcAppDB", {useNewUrlParser: true, useUnifiedTopology: true });

const schema = new mongoose.Schema({   
    userId: String, 
    previouslySubmitted: Boolean,
    firstName: String,
    lastName: String,
    company: String
});

const User = mongoose.model('User', schema);

console.log();
console.log("server starting...");

// global vars
// stores the object type bin for each image
allObjectTypes = objectTypes.objectTypes;

// Stores path of each image the user answered incorrectly by page (1-5)
//                 page:   1   2   3   4   5   
var missedImagesByPage = [ [], [], [], [], [] ];

// Stores path of each image the user answered incorrectly by type 
var missedImagesByType = new Map();

// Stores path of all images by type
var allImagesByType = new Map();

// total number of incorrect user responses by object type bin
var totalIncorrectByType = new Map();

// total number of images by object bin type
var numImagesByType = new Map();

app.get("/", function(request,response) {

    var ipAddress = request.connection.remoteAddress;

    const newUser = new User({ 
        userId: ipAddress,
        previouslySubmitted: false,
    });

    // console.log(users);

    newUser.save();

    // newUser.save(function() {
    //     User.find({userId: ipAddress}, function(error,data) {
    //         if (error) {
    //             console.log(error);
    //         } else {
    //             console.log("data:");
    //             console.log(data);
    //             console.log();
    //             console.log(data[0].previouslySubmitted);
    //         }
    //     });
    // });


    response.sendFile(path.join(__dirname + '/html_pages/welcome_page.html'));
});

app.post("/html_pages/welcome_page", function(request,response) {
    response.redirect('/html_pages/login_page');

    var ipAddress = request.connection.remoteAddress;
    User.find({userId: ipAddress}, function(error,data) {
        console.log("Before Update: ");
        if (error) {
            console.log(error);
        } else {
            console.log("data:");
            console.log(data);
        }
    });

    User.findOneAndUpdate({userId: ipAddress}, {previouslySubmitted: true}, {upsert: true}, function(err, doc) {

    });

    User.find({userId: ipAddress}, function(error,data) {
        console.log("After Update: ");
        if (error) {
            console.log(error);
        } else {
            console.log("data:");
            console.log(data);
        }
    });

});

app.get("/html_pages/login_page", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/login_page.html'));
});

app.post("/html_pages/login_page", function(request,response) {
    firstName = request.body.firstName;
    lastName = request.body.lastName;
    company = request.body.company;

    var ipAddress = request.connection.remoteAddress;
    User.updateOne({_id: ipAddress}, {firstName: firstName, lastName: lastName, company: company} , function(e) {});

    response.redirect('/html_pages/instructions_page');
});

app.get("/html_pages/instructions_page", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/instructions_page.html'));
});

app.post("/html_pages/instructions_page", function(request,response) {
    response.redirect('/html_pages/page_1');
});

app.get("/html_pages/page_1", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/page_1.html'));
});

app.post("/html_pages/page_1", function(request,response) {
    missedImagesByPage[0] = [];
    answerKeyPageOne = answerKeys.answerKeys[0];
    driveApp(answerKeyPageOne,request,1);
    response.redirect('/html_pages/page_2');
});

app.get("/html_pages/page_2", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/page_2.html'));
});

app.post("/html_pages/page_2", function(request,response) {
    var btnClicked = request.body.btn;
    missedImagesByPage[1] = [];
    answerKeyPageTwo = answerKeys.answerKeys[1];
    driveApp(answerKeyPageTwo,request,2);
    if (btnClicked == "Previous") {
        response.redirect('/page_1');
    } else if (btnClicked == "Next") {
        response.redirect('/html_pages/page_3');
    }
});

app.get("/html_pages/page_3", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/page_3.html'));
});

app.post("/html_pages/page_3", function(request,response) {
    var btnClicked = request.body.btn;
    missedImagesByPage[2] = [];
    answerKeyPageThree = answerKeys.answerKeys[2];
    driveApp(answerKeyPageThree,request,3);
    if (btnClicked == "Previous") {
        response.redirect('/html_pages/page_2');
    } else if (btnClicked == "Next") {
        response.redirect('/html_pages/page_4');
    }
});

app.get("/html_pages/page_4", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/page_4.html'));
});

app.post("/html_pages/page_4", function(request,response) {
    var btnClicked = request.body.btn;
    missedImagesByPage[3] = [];
    answerKeyPageFour = answerKeys.answerKeys[3];
    driveApp(answerKeyPageFour,request,4);
    if (btnClicked == "Previous") {
        response.redirect('/html_pages/page_3');
    } else if (btnClicked == "Next") {
        response.redirect('/html_pages/page_5');
    }
});

app.get("/html_pages/page_5", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/page_5.html'));
});

app.post("/html_pages/page_5", function(request,response) {
    var btnClicked = request.body.btn;
    missedImagesByPage[4] = [];
    answerKeyPageFive = answerKeys.answerKeys[4];
    driveApp(answerKeyPageFive,request,5);
    if (btnClicked == "Previous") {
        response.redirect('/html_pages/page_4');
    } else if (btnClicked == "Continue") {
        response.redirect('/html_pages/review');
    }
});

app.get("/html_pages/review", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/review.html'));
});

app.post("/html_pages/review", function(request,response) {
    if (previouslySubmitted) {
        response.redirect('/html_pages/form_already_submitted_page');
    } else {
        var btnClicked = request.body.btn;
        if (btnClicked == "Previous") {
            response.redirect('/html_pages/page_5');
        } else {
            previouslySubmitted = true;
            initByTypeMaps();
            postAllImagePaths();
            postMissedImagePaths();
            postResultsData();
            writeResultsFile();
            sendEmailWithResults();
            response.redirect('/html_pages/results');
        }
    }
});

app.get("/html_pages/results", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/results.html'));
});

app.get("/html_pages/form_already_submitted_page", function(request,response) {
    response.sendFile(path.join(__dirname + 
        '/html_pages/form_already_submitted_page.html'));
});

app.listen(process.env.PORT || 3000);

/**
 * Initializes all the by type maps with the appropriate object type 
 */
function initByTypeMaps() {
    for (var i = 0; i < allObjectTypes.length; i++) {
        var objectType = allObjectTypes[i];
        missedImagesByType.set(objectType, new Array());
        totalIncorrectByType.set(objectType, 0);
        numImagesByType.set(objectType, 0);
    }
}

/**
 * Stores answer key, user responses, and determines missed image paths for
 * each page in the client side form.
 * @param {JS document} answerKeyPage - js document containing all answers with 
 *                                      "yes" and "no" string values. 
 * @param {Object} request - holds all http request information from user.
 * @param {number} pageNumber - page number in client side application.
 */
function driveApp(answerKeyPage,request,pageNumber) {
    var userResponses = initUserResponses(request);
    recordUserResponses(userResponses);
    setMissedImagesByPage(answerKeyPage, userResponses, pageNumber - 1);
}

/**
 * Consumes and stores user responses from client side.
 * @param {Object} request - holds all http request information from the user.
 * @return - array containing user responses from client side.
 */
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

/**
 * Replaces all user responses with boolean and null values equivalent to their 
 * responses.
 * This function is not explicitly necessary, but makes following code cleaner.
 * @param {Array} userResponses - array containing user responses for all the 
 *                                object images.
 */
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

/**
 * Stores (by object type bin) the image paths of each image the user responded 
 * to incorrectly.
 * @param {Array} answerKey - Array containing boolean values representing 
 *                            answers for each question.
 * @param {Array} userResponses - Array containing boolean values representing 
 *                                user responses for each question.
 * @param {number} pageNumber - Client side page number corresponding with user
 *                              response.
 */
function setMissedImagesByPage(answerKey,userResponses,pageNumber) { 
    for (var i = 0; i < 10; i++) {
        if (answerKey[i] != userResponses[i] || userResponses[i] == null) {  
            var imageNumber = String(pageNumber) + String(i);
            missedImagesByPage[pageNumber].push(imageNumber);
        }
    }
}

/**
 * Writes and posts JSON files (seperate file for each object type bin) 
 * containing the user's incorrect answers.
 */
function postAllImagePaths() {
    setAllImagePaths();
    writeImagePaths(allImagesByType, "all_image_paths");
}

/**
 * Sets all image paths and missed iamge paths. 
 */
function setAllImagePaths() {
    for (var i = 0; i < allObjectTypes.length/10; i++) {
        for (var j = 0; j < 10; j++) {
            var imageNum = String(i) + String(j);
            var imagePath = '/static/object_answers/object' + imageNum 
                + 'answer.png';
            var thisObjectType = allObjectTypes[Number(imageNum)];
            if (allImagesByType.has(thisObjectType)) {
                allImagesByType.get(thisObjectType).push(imagePath);
                // increment total number images for this Object type
                numImagesByType.set(thisObjectType, 
                    numImagesByType.get(thisObjectType) + 1);
            } else {
                allImagesByType.set(thisObjectType, new Array(imagePath)); 
                // init total number images for this Object type
                numImagesByType.set(thisObjectType, 1);
            }
        }
    }
}

/**
 * Writes all image paths to a JSON file to be accessed on the client side. 
 * @param {Map} allImagesByTypeObject - contains all the images organized by 
 *                                      Object type bin.
 */
function writeImagePaths(imagesByType,fileName) {
    fs.writeFile("./client_side_code/" + fileName + ".json", "", function(){
        var imagesByTypeKeys = Array.from(imagesByType.keys());
        for (var i = 0; i < imagesByTypeKeys.length; i++) {
            for (var j = 0; j < imagesByType.get(imagesByTypeKeys[i]).length; 
                j++) {
                    var thisImageObject = {};
                    thisImageObject[imagesByTypeKeys[i]] =
                    imagesByType.get(imagesByTypeKeys[i])[j];
                    fs.appendFileSync("./client_side_code/" + fileName + ".json", 
                        JSON.stringify(thisImageObject, null, 4), function(){});
            }
        }
    });
}

/**
 * Organizes and posts image paths associated with an incorrect user answer 
 * into the appropriate Object type bins.
 */
function postMissedImagePaths() {
    setMissedImagesByType();
    writeImagePaths(missedImagesByType, "missed_image_paths");
}

/**
 * Stores (by Object type bin) the image paths of each image the user responded 
 * to incorrectly.
 */
function setMissedImagesByType() { 
    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < missedImagesByPage[i].length; j++) {
            var imageNum = missedImagesByPage[i][j];
            var imagePath = '/static/object_answers/object' + imageNum + 
                'answer.png';
            var thisObjectType = getThisObjectType(imageNum);
            missedImagesByType.get(thisObjectType).push(imagePath);
            totalIncorrectByType.set(thisObjectType, 
                totalIncorrectByType.get(thisObjectType) + 1);
        }
    }
}

/**
 * Gets the Object type for the image the user answered incorrectly
 * @param {String} missedImagePath - Path for image that the user answered 
 *                                   incorrectly
 * @return - Object type bin associated with specific image
 */
function getThisObjectType(imageNum) {
    if (Number(imageNum.charAt(0) == 0)) {
        var num = Number(imageNum.charAt(1));
        return allObjectTypes[num];
    } else {
        return allObjectTypes[Number(imageNum)];
    }
}

// total number of incorrect user responses
var totalIncorrect = 0;

/**
 * Posts a breakdown of the user's performance overall and within each Object 
 * type on the exam. 
 */
function postResultsData() {
    var totalIncorrectByTypeString = setTotalIncorrectByType();
    var totalIncorrectString = setTotalIncorrect();
    var numImagesByTypeString = setNumImagesByType();
    fs.writeFile("./public/results_data.json",  
        totalIncorrectString + 
        totalIncorrectByTypeString + 
        numImagesByTypeString , function() {
    });
}

/**
 * Creates a JSON String representing the total number of incorrect responses
 * by the user.
 * @return - JSON String representing total number of incorrect responses by 
 *           the user.
 */
function setTotalIncorrect() {
    totalIncorrectObject = {};
    totalIncorrectObject["totalIncorrect"] = totalIncorrect;
    return JSON.stringify(totalIncorrectObject, null, 4);
}

/**
 * Sets the user's total number of incorrect responses by Object type.
 * @return - a string representing the user's total number of incorrect 
 *           responses by Object type.
 */
function setTotalIncorrectByType() {
    var totalIncorrectByTypeObject = {};
    var totalIncorrectByTypeKeys = Array.from(totalIncorrectByType.keys());
    for (var i = 0; i < totalIncorrectByTypeKeys.length; i++) {
        var thisTypeTotalIncorrect = 
            totalIncorrectByType.get(totalIncorrectByTypeKeys[i]);
        totalIncorrectByTypeObject[totalIncorrectByTypeKeys[i]] = thisTypeTotalIncorrect;
        totalIncorrect += thisTypeTotalIncorrect;
    }
    return JSON.stringify(totalIncorrectByTypeObject,null,4);
}

/**
 * Sets the total number of questions for each Object type.
 * @return - a string representing the total number of images by Object type.
 */
function setNumImagesByType() {
    var numImagesByTypeObject = {};
    var numImagesByTypeKeys = Array.from(numImagesByType.keys());
    for (var i = 0; i < numImagesByTypeKeys.length; i++) {
        var thisNumImagesByType = numImagesByType.get(numImagesByTypeKeys[i]);
        numImagesByTypeObject[numImagesByTypeKeys[i]] = 
            thisNumImagesByType;
    }
    return JSON.stringify(numImagesByTypeObject,null,4);
}

function writeResultsFile() {
    fs.writeFile("./final_results.txt", "Test Taker: " + firstName + " " + 
        lastName + "\n" + "\n" + "Company: " + company + "\n" + "\n", 
            function() {
        fs.appendFileSync("./final_results.txt", "Breakdown: " + "\n", 
        function() {});
        var keys = Array.from(totalIncorrectByType.keys());
        for (var i = 0; i < keys.length; i++) {
            fs.appendFileSync("./final_results.txt", "\n" + fileContents(keys[i]), 
                function(){});
        }
        var time = new Date();
        if (time.getHours >= 12) {
            time.setUTCHours(time.getUTCHours() - 8);
        } else {
            time.setUTCHours(time.getUTCHours());
        }
        fs.appendFileSync("./final_results.txt", "\n" + "Time Stamp: " 
                          + (time.toLocaleString()), function(){});
    });
}

function fileContents(objectType) {
    var percentageIncorrect = 100*totalIncorrectByType.get(objectType)/
        numImagesByType.get(objectType);
    var percentageCorrect = (100 - Math.round(percentageIncorrect));
    var globalMessage = "object Type " + objectType + ": Missed " + 
        totalIncorrectByType.get(objectType) + " out of " + 
            numImagesByType.get(objectType) + " (" + percentageCorrect + "%)" + "\n";
    var granularMessage = "Images Missed: ";
    for (var i = 0; i < missedImagesByType.get(objectType).length; i++) {
        if (i != 0) {
            granularMessage += ", ";
        }
        granularMessage += missedImagesByType.get(objectType)[i].substring(29,31);
    }
    granularMessage += "\n";
    return globalMessage + granularMessage;
}

function sendEmailWithResults() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:'klduplessis@gmail.com',
            pass:'gdliyxusctinnsia'
        }
    });

    let mailOptions = {
        from: 'klduplessis@gmail.com',
        to: 'klduplessis@gmail.com',
        subject: 'CTC Test Results',
        text: 'It works',
        attachments: [{
            filename: 'final_results.txt',
            path: './final_results.txt'
        }]
    }

    transporter.sendMail(mailOptions, function(error,data) {
        if (error) {
            console.log("Error Occurs");
        } else {
            console.log("Email sent");
        }
    });
}