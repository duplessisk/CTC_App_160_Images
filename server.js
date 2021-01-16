const express = require("express");
const path = require("path");
const fs = require("fs");
const bodyParser = require("body-parser");
const answerKeys = require(path.join(__dirname + '/cell_types'));
const cellTypes = require(path.join(__dirname + '/cell_types'));
const nodemailer = require("nodemailer");
require("dotenv").config();

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
    response.redirect('/login_page');
});

app.get("/login_page", function(request,response) {
    previouslySubmitted = false;
    response.sendFile(path.join(__dirname + '/login_page.html'));
});

var firstName;
var lastName;
var email;

app.post("/login_page", function(request,response) {
    firstName = request.body.firstName;
    lastName = request.body.lastName;
    email = request.body.email;
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
    missedImagesByType.set("A", new Array());
    totalIncorrectByType.set("A", 0);
    numImagesByType.set("A", 0);

    answerKeyPageOne = answerKeys.answerKeys[0];
    driveApp(answerKeyPageOne,request,1);
    response.redirect('/page_two');
});

app.get("/page_two", function(request,response) {
    response.sendFile(path.join(__dirname + '/page_two.html'));
});

app.post("/page_two", function(request,response) {
    var buttonClicked = request.body.button;
    missedImagesByType.set("B", new Array());
    totalIncorrectByType.set("B", 0);
    numImagesByType.set("B", 0);

    answerKeyPageTwo = answerKeys.answerKeys[1];
    driveApp(answerKeyPageTwo,request,2);
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
    missedImagesByType.set("C", new Array());
    totalIncorrectByType.set("C", 0);
    numImagesByType.set("C", 0);

    answerKeyPageThree = answerKeys.answerKeys[2];
    driveApp(answerKeyPageThree,request,3);
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
    missedImagesByType.set("D", new Array());
    totalIncorrectByType.set("D", 0);
    numImagesByType.set("D", 0);
    answerKeyPageFour = answerKeys.answerKeys[3];

    driveApp(answerKeyPageFour,request,4);
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
    missedImagesByType.set("E", new Array());
    totalIncorrectByType.set("E", 0);
    numImagesByType.set("E", 0);
    answerKeyPageFive = answerKeys.answerKeys[4];

    driveApp(answerKeyPageFive,request,5);
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
            postAllImagePaths();
            postMissedImagePaths();
            postResultsData();
            writeResultsFile();
            sendEmailWithResults();
            response.redirect('/results');
        }
    }
});

app.get("/results", function(request,response) {
    response.sendFile(path.join(__dirname + '/results.html'));
});

app.get("/form_already_submitted_page", function(request,response) {
    response.sendFile(path.join(__dirname + 
        '/form_already_submitted_page.html'));
});

app.listen(process.env.PORT || 3000);

/**
 * Stores answer key, user responses, and determines missed image paths for
 * each page in the client side form.
 * @param {JS document} answerKeyPage - js document containing all answers with 
 *                                      "yes" and "no" string values. 
 * @param {Object} request - holds all http request information from user.
 * @param {number} pageNumber - page number in client side application.
 */
function driveApp(answerKeyPage,request,pageNumber) {
    var answerKey = createAnswerKey(answerKeyPage);
    var userResponses = initUserResponses(request);
    recordUserResponses(userResponses);
    setMissedImagePaths(answerKey, userResponses, pageNumber);
}


/**
 * Replaces all answers with boolean and null values equivalent to the 
 * specified answer.
 * This function is not explicitly necessary, but makes following code cleaner.
 * @param {JS document} answerKey - js document containing all the answers with 
 *                                  "yes" and "no" string values.
 * @return - Array containing all answers with boolean values.
 */
function createAnswerKey(answerKey) {
    for (var i = 0; i < answerKey.length; i++) {
        if (answerKey[i] == "y") {
            answerKey[i] = true;
        } else {
            answerKey[i] = false;
        }
    }
    return answerKey;
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
 *                                cell images.
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

// Stores path of each image the user answered incorrectly by type 
var missedImagesByType = new Map();

// stores the cell type bin for each image
allCellTypes = cellTypes.cellTypes;

/**
 * Writes and posts JSON files (seperate file for each cell type bin) 
 * containing the user's incorrect answers.
 */
function postAllImagePaths() {
    var allImagesByType = setAllImagePaths();
    writeImagePaths(allImagesByType, "all_image_paths");
}

/**
 * Sets all image paths and missed iamge paths. 
 */
function setAllImagePaths() {
    var allImagesByType = new Map();
    for (var i = 0; i < allCellTypes.length/10; i++) {
        for (var j = 0; j < 10; j++) {
            var imagePath = '/static/cell_answers/cell' + String(i) + String(j)
                + 'answer.JPG';
            var thisCellType = getThisCellType(imagePath); 
            if (allImagesByType.has(thisCellType)) {
                allImagesByType.get(thisCellType).push(imagePath);
                // increment total number images for this cell type
                numImagesByType.set(thisCellType, 
                    numImagesByType.get(thisCellType) + 1);
            } else {
                allImagesByType.set(thisCellType, new Array(imagePath)); 
                // init total number images for this cell type
                numImagesByType.set(thisCellType, 1);
            }
        }
    }
    return allImagesByType;
}

function writeImagePaths(imagesByType,fileName) {
    fs.writeFile("/static/" + fileName + ".json", "", function(){
        var imagesByTypeKeys = Array.from(imagesByType.keys());
        for (var i = 0; i < imagesByTypeKeys.length; i++) {
            for (var j = 0; 
                j < imagesByType.get(imagesByTypeKeys[i]).length; j++) {
                    var thisImageObject = {};
                    thisImageObject[imagesByTypeKeys[i]] =
                    imagesByType.get(imagesByTypeKeys[i])[j];
                    fs.appendFileSync("/static/" + fileName + ".json", 
                        JSON.stringify(thisImageObject, null, 4), function(){});
            }
        }
    });
}

/**
 * Organizes and posts image paths associated with an incorrect user answer 
 * into the appropriate cell type bins.
 */
function postMissedImagePaths() {
    writeImagePaths(missedImagesByType, "missed_image_paths");
}

/**
 * Stores (by cell type bin) the image paths of each image the user responded 
 * to incorrectly.
 * @param {Array} answerKey - Array containing boolean values representing 
 *                            answers for each question.
 * @param {Array} userResponses - Array containing boolean values representing 
 *                                user responses for each question.
 * @param {number} pageNumber - Client side page number corresponding with user
 *                              response.
 */
function setMissedImagePaths(answerKey,userResponses,pageNumber) { 
    for (var i = 0; i < 10; i++) {
        if (answerKey[i] != userResponses[i] || userResponses[i] == null) {  
            var imagePath = '/static/cell_answers/cell' + 
                String(pageNumber - 1) + String(i) + 'answer.JPG';
            var thisCellType = getThisCellType(imagePath);
            missedImagesByType.get(thisCellType).push(imagePath);
            totalIncorrectByType.set(thisCellType, 
                totalIncorrectByType.get(thisCellType) + 1);
        } else {
            console.log("Missed Question on Page " + pageNumber);
        }
    }
}

/**
 * Gets the cell type for the image the user answered incorrectly
 * @param {String} missedImagePath - Path for image that the user answered 
 *                                   incorrectly
 * @return - cell type bin associated with specific image
 */
function getThisCellType(imagePath) {
    var imageNum = imagePath.substring(25,27);
    if (Number(imageNum.charAt(0) == 0)) {
        var num = Number(imageNum.charAt(1));
        return allCellTypes[num];
    } else {
        return allCellTypes[Number(imageNum)];
    }
}

// total number of incorrect user responses
var totalIncorrect = 0;

// total number of incorrect user responses by cell type bin
var totalIncorrectByType = new Map();

// total number of images by cell bin type
var numImagesByType = new Map();

/**
 * Posts a breakdown of the user's performance overall and within each cell 
 * type on the exam. 
 */
function postResultsData() {
    console.log("total incorrect");
    console.log(totalIncorrect);
    var totalIncorrectByTypeString = setTotalIncorrectByType();
    var totalIncorrectString = setTotalIncorrect();
    var numImagesByTypeString = setNumImagesByType();
    fs.writeFile("/static/results_data.json",  
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
 * Sets the user's total number of incorrect responses by cell type.
 * @return - a string representing the user's total number of incorrect 
 *           responses by cell type.
 */
function setTotalIncorrectByType() {
    var totalIncorrectByTypeObject = {};
    var totalIncorrectByTypeKeys = Array.from(totalIncorrectByType.keys());
    for (var i = 0; i < totalIncorrectByTypeKeys.length; i++) {
        var thisTypeTotalIncorrect = 
            totalIncorrectByType.get(totalIncorrectByTypeKeys[i]);
        totalIncorrectByTypeObject["numIncorrectType" + 
            totalIncorrectByTypeKeys[i] + ""] = thisTypeTotalIncorrect;
        totalIncorrect += thisTypeTotalIncorrect;
    }
    return JSON.stringify(totalIncorrectByTypeObject,null,4);
}

/**
 * Sets the total number of questions for each cell type.
 * @return - a string representing the total number of images by cell type.
 */
function setNumImagesByType() {
    var numImagesByTypeObject = {};
    var numImagesByTypeKeys = Array.from(numImagesByType.keys());
    for (var i = 0; i < numImagesByTypeKeys.length; i++) {
        var thisNumImagesByType = numImagesByType.get(numImagesByTypeKeys[i]);
        numImagesByTypeObject["totalNumType" + numImagesByTypeKeys[i] + ""] = 
            thisNumImagesByType;
    }
    return JSON.stringify(numImagesByTypeObject,null,4);
}

function writeResultsFile() {
    fs.writeFile("/final_results.txt", firstName + " " + lastName + "\n" + 
                 "\n", function() {
        fs.appendFileSync(__dirname + "/final_results.txt", "Number Correct: " + "\n", 
        function() {});
        var keys = Array.from(totalIncorrectByType.keys());
        for (var i = 0; i < keys.length; i++) {
            fs.appendFileSync(__dirname + "/final_results.txt",   
                "Cell Type " + keys[i] + ": " +
                    String(10 - totalIncorrectByType.get(keys[i])) + " " + "out of " + 
                        String(numImagesByType.get(keys[i])) + " (" + 
                            (100 - Math.round(100*totalIncorrectByType.get(keys[i])/numImagesByType.get(keys[i])))  
                                 + "%)" + "\n", function(){});
        }
        var time = new Date();
        fs.appendFileSync("/final_results.txt", "\n" + "Time Stamp: " 
                          + time.toLocaleString(), function(){});
    });
}

function sendEmailWithResults() {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user:process.env.EMAIL,
            pass:process.env.PASSWORD
        }
    });

    let mailOptions = {
        from: 'klduplessis@gmail.com',
        to: email,
        subject: 'yep!',
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
