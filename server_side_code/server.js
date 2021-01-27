const express = require("express");
const mongoose = require('mongoose');
const MongooseMap = require('mongoose-map')(mongoose);
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

mongoose.connect("mongodb+srv://admin-kyle:Subaru2007@ctcappcluster.4hrjs.mongodb.net/ctcAppDB", {useNewUrlParser: true, 
    useUnifiedTopology: true , useFindAndModify: false });

const schema = new mongoose.Schema({   
    userId: String, 
    previouslySubmitted: Boolean,
    firstName: String,
    lastName: String,
    company: String,
    missedImagesByPage: Object,
});

const User = mongoose.model('User', schema);

console.log();
console.log("server starting...");

app.get("/", function(request,response) {

    var ipAddress = request.connection.remoteAddress;

    const newUser = new User({ 
        userId: ipAddress,
        previouslySubmitted: false,
        missedImagesByPage: [ [], [], [], [], [] ]
    });

    newUser.save();

    response.sendFile(path.join(__dirname + '/html_pages/welcome_page.html'));

});

app.post("/html_pages/welcome_page", function(request,response) {
    response.redirect('/html_pages/login_page');

});

app.get("/html_pages/login_page", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/login_page.html'));
});

app.post("/html_pages/login_page", function(request,response) {
    firstName = request.body.firstName;
    lastName = request.body.lastName;
    company = request.body.company;
    
    var ipAddress = request.connection.remoteAddress;

    User.findOneAndUpdate({userId: ipAddress}, 
        {firstName: request.body.firstName, lastName: request.body.lastName,
            company: request.body.company}, {upsert: false}, function() {});

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
    // resetMissedImagesByPage(request,1);
    answerKeyPageOne = answerKeys.answerKeys[0];
    driveApp(answerKeyPageOne,request,1);
    response.redirect('/html_pages/page_2');
});

app.get("/html_pages/page_2", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/page_2.html'));
});

app.post("/html_pages/page_2", function(request,response) {
    // resetMissedImagesByPage(request,2);
    answerKeyPageTwo = answerKeys.answerKeys[1];
    driveApp(answerKeyPageTwo,request,2);
    var btnClicked = request.body.btn;
    if (btnClicked == "Previous") {
        resetMissedImagesByPage(request,1);
        response.redirect('/html_pages/page_1');
    } else if (btnClicked == "Next") {
        response.redirect('/html_pages/page_3');
    }
});

app.get("/html_pages/page_3", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/page_3.html'));
});

app.post("/html_pages/page_3", function(request,response) {
    // resetMissedImagesByPage(request,3);
    answerKeyPageThree = answerKeys.answerKeys[2];
    driveApp(answerKeyPageThree,request,3);
    var btnClicked = request.body.btn;
    if (btnClicked == "Previous") {
        resetMissedImagesByPage(request,2);
        response.redirect('/html_pages/page_2');
    } else if (btnClicked == "Next") {
        response.redirect('/html_pages/page_4');
    }
});

app.get("/html_pages/page_4", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/page_4.html'));
});

app.post("/html_pages/page_4", function(request,response) {
    // resetMissedImagesByPage(request,4);
    answerKeyPageFour = answerKeys.answerKeys[3];
    driveApp(answerKeyPageFour,request,4);
    var btnClicked = request.body.btn;
    if (btnClicked == "Previous") {
        resetMissedImagesByPage(request,3);
        response.redirect('/html_pages/page_3');
    } else if (btnClicked == "Next") {
        response.redirect('/html_pages/page_5');
    }
});

app.get("/html_pages/page_5", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/page_5.html'));
});

app.post("/html_pages/page_5", function(request,response) {
    // resetMissedImagesByPage(request,5);
    answerKeyPageFive = answerKeys.answerKeys[4];
    driveApp(answerKeyPageFive,request,5);
    var btnClicked = request.body.btn;
    if (btnClicked == "Previous") {
        resetMissedImagesByPage(request,4);
        response.redirect('/html_pages/page_4');
    } else if (btnClicked == "Continue") {
        response.redirect('/html_pages/review');
    }
});

app.get("/html_pages/review", function(request,response) {
    response.sendFile(path.join(__dirname + '/html_pages/review.html'));
});

app.post("/html_pages/review", function(request,response) {
    
    var ipAddress = request.connection.remoteAddress;

    

    User.findOne({userId: ipAddress}, function(e, userData) {
        var btnClicked = request.body.btn;
        if (btnClicked == "Previous") {
            resetMissedImagesByPage(request,5);
            response.redirect('/html_pages/page_5');
        } else {
            if (userData.previouslySubmitted) {
                response.redirect('/html_pages/form_already_submitted_page');
            } else {
                User.findOneAndUpdate({userId: ipAddress}, 
                    {previouslySubmitted: true}, {upsert: false}, 
                        function() {});
                var numImagesByType = postAllImagePaths(userData);
                [missedImagesByType,totalMissedByType] = 
                    postMissedImagePaths(userData);
                
                var totalIncorrect = getTotalIncorrect(totalMissedByType);
                postResultsData(numImagesByType, totalMissedByType, 
                    totalIncorrect);
                writeResultsFile(totalMissedByType, numImagesByType, 
                    missedImagesByType);
                // sendEmailWithResults();
                response.redirect('/html_pages/results');
            }
        }
    });
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
 * Resets the missed images for the specified page (allows user to navigate 
 * from the current page and then return to it).
 * @param {http} request - http request from client.
 * @param {Number} pageNumber - page whose missed paths are to be reset.
 */
function resetMissedImagesByPage(request,pageNumber) {
    var ipAddress = request.connection.remoteAddress;

    User.findOne({userId: ipAddress}, function(err,userData) {
        var updatedMissedImagesByPage = userData.missedImagesByPage;
        updatedMissedImagesByPage[pageNumber - 1] = [];
        User.findOneAndUpdate({userId: ipAddress}, 
            {missedImagesByPage: updatedMissedImagesByPage}, {upsert: false}, function() {});
    });   
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
    setMissedImagesByPage(request,answerKeyPage, userResponses, pageNumber - 1);
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
 * @param {*} request - 
 * @param {Array} answerKey - Array containing boolean values representing 
 *                            answers for each question.
 * @param {Array} userResponses - Array containing boolean values representing 
 *                                user responses for each question.
 * @param {number} pageNumber - Client side page number corresponding with user
 *                              response.
 */
function setMissedImagesByPage(request,answerKey,userResponses,pageNumber) { 

    var ipAddress = request.connection.remoteAddress;
    console.log();
    console.log("ipAddress");
    console.log(ipAddress);
    User.findOne({userId: ipAddress}, function(err,userData) {

        var updatedMissedImagesByPage = userData.missedImagesByPage;
        for (var i = 0; i < 10; i++) {
            if (answerKey[i] != userResponses[i] || userResponses[i] == null) {  
                var imageNumber = String(pageNumber) + String(i);
                var ipAddress = request.connection.remoteAddress;
                updatedMissedImagesByPage[pageNumber].push(imageNumber);
            }
        }
        User.findOneAndUpdate({userId: ipAddress}, 
            {missedImagesByPage: updatedMissedImagesByPage}, {upsert: false}, 
            function() {});

    });   

}


/**
 * Writes and posts JSON files (seperate file for each object type bin) 
 * containing the user's incorrect answers.
 * @return - numImagesByType.
 */
function postAllImagePaths() {
    [allImagesByType, numImagesByType] = setAllImagePaths();
    writeImagePaths(allImagesByType, "all_image_paths");
    return numImagesByType;
}

/**
 * Sets all image paths and missed iamge paths. 
 * @return - Array containing allImagesByType and numImagesByType.
 */
function setAllImagePaths() {

    var allObjectTypes = objectTypes.objectTypes;
    var allImagesByType = new Map();
    var numImagesByType = new Map();

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

    return [allImagesByType, numImagesByType];
}

/**
 * Organizes and posts image paths associated with an incorrect user answer 
 * into the appropriate Object type bins.
 * @return - array containing missedImagesByType and totalMissedByType.
 */
function postMissedImagePaths(userData) {
    [missedImagesByType,totalMissedByType] = setMissedImagePaths(userData);
    writeImagePaths(missedImagesByType, "missed_image_paths");
    return [missedImagesByType,totalMissedByType];
}

/**
 * Stores (by Object type bin) the image paths of each image the user responded 
 * to incorrectly.
 * @param {MongoDB document} userData - contains all the data related to 
 *                                      this client's request.
 * @return - array containing missedImagesByType and totalMissedByType.
 */
function setMissedImagePaths(userData) {

    var allObjectTypes = objectTypes.objectTypes;
    var missedImagesByPage = userData.missedImagesByPage;
    [missedImagesByType, totalMissedByType] = initMissedMaps(allObjectTypes);

    for (var i = 0; i < 5; i++) {
        for (var j = 0; j < missedImagesByPage[i].length; j++) {
            var imageNum = missedImagesByPage[i][j];
            var imagePath = '/static/object_answers/object' + imageNum + 
                'answer.png';

            var thisObjectType = getThisObjectType(allObjectTypes,imageNum);
            if (missedImagesByType.has(thisObjectType)) {
                totalMissedByType.set(thisObjectType, 
                    totalMissedByType.get(thisObjectType) + 1);
                missedImagesByType.get(thisObjectType).push(imagePath);
            }
        }
    }

    return [missedImagesByType, totalMissedByType];

}

/**
 * Adds keys for missedImagesByType and totalMissedByType maps.
 * @param {Array} allObjectTypes - Records type of each object.
 * @return - array containing missedImagesByType and totalMissedByType.
 */
function initMissedMaps(allObjectTypes) {
    var totalMissedByType = new Map();
    var missedImagesByType = new Map();
    for (var i = 0; i < allObjectTypes.length; i++) {
        var objectType = allObjectTypes[i];
        totalMissedByType.set(objectType, 0);
        missedImagesByType.set(objectType, new Array());
    }
    return [missedImagesByType,totalMissedByType];
}

/**
 * Records the total number of incorrect responses for each object type
 * @param {Map} totalMissedByType - Contains total number of missed objects by 
 *                                  type
 * @return - total number of incorrect objects (type agnostic) 
 */
function getTotalIncorrect(totalMissedByType) {
    var totalIncorrect = 0;
    var keys = Array.from(totalMissedByType.keys());
    for (var i = 0; i < keys.length; i++) {
        totalIncorrect += totalMissedByType.get(keys[i]).length;
    }
    return totalIncorrect;
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
 * Gets the Object type for the image the user answered incorrectly
 * @param {String} missedImagePath - Path for image that the user answered 
 *                                   incorrectly
 * @return - Object type bin associated with specific image
 */
function getThisObjectType(allObjectTypes,imageNum) {
    if (Number(imageNum.charAt(0) == 0)) {
        var num = Number(imageNum.charAt(1));
        return allObjectTypes[num];
    } else {
        return allObjectTypes[Number(imageNum)];
    }
}

/**
 * Posts a breakdown of the user's performance overall and within each Object 
 * type on the exam. 
 */
function postResultsData(numImagesByType, totalMissedByType, totalIncorrect) {
    var numImagesByTypeString = setNumImagesByType(numImagesByType);
    var totalMissedByTypeString = settotalMissedByType(totalMissedByType);
    var totalIncorrectString = setTotalIncorrect(totalIncorrect);

    fs.writeFile("./client_side_code/results_data.json",  
        totalIncorrectString + 
        totalMissedByTypeString + 
        numImagesByTypeString , function() {
    });
}

/**
 * Creates a JSON String representing the total number of incorrect responses
 * by the user.
 * @totalIncorrect {Number} - total number of incorrect objects (type agnostic).
 * @return - JSON String representing total number of incorrect responses by 
 *           the user.
 */
function setTotalIncorrect(totalIncorrect) {
    totalIncorrectObject = {};
    totalIncorrectObject["totalIncorrect"] = totalIncorrect;
    return JSON.stringify(totalIncorrectObject, null, 4);
}

/**
 * Sets the total number of questions for each Object type.
 * @numImagesByType {Map} - contains the total number of objects by type.
 * @return - a string representing the total number of images by Object type.
 */
function setNumImagesByType(numImagesByType) {
    var numImagesByTypeObject = {};
    var numImagesByTypeKeys = Array.from(numImagesByType.keys());
    for (var i = 0; i < numImagesByTypeKeys.length; i++) {
        var thisNumImagesByType = numImagesByType.get(numImagesByTypeKeys[i]);
        numImagesByTypeObject[numImagesByTypeKeys[i]] = 
            thisNumImagesByType;
    }
    return JSON.stringify(numImagesByTypeObject,null,4);
}

/**
 * Sets the user's total number of incorrect responses by Object type.
 * @totalMissedByType - contains number of missed objects by type.
 * @return - a string representing the user's total number of incorrect 
 *           responses by Object type.
 */
function settotalMissedByType(totalMissedByType) {

    var totalMissedByTypeObject = {};
    var totalMissedByTypeKeys = Array.from(totalMissedByType.keys());
    for (var i = 0; i < totalMissedByTypeKeys.length; i++) {
        var thisTypeTotalIncorrect = 
            totalMissedByType.get(totalMissedByTypeKeys[i]);
        totalMissedByTypeObject[totalMissedByTypeKeys[i]] = 
            thisTypeTotalIncorrect;
    }
    return JSON.stringify(totalMissedByTypeObject,null,4);
}

/**
 * Writes the results file that contains all of the object type and score data 
 * that is used to populate the results page on the front end. 
 * @param {*} totalMissedByType - 
 * @param {*} numImagesByType - 
 * @param {*} missedImagesByType -  
 */
function writeResultsFile(totalMissedByType, numImagesByType, 
                          missedImagesByType) {
    firstName = "Kyle";
    lastName = "Duplessis";
    company = "Rarecyte";

    fs.writeFile("./final_results.txt", "Test Taker: " + firstName + " " + 
        lastName + "\n" + "\n" + "Company: " + company + "\n" + "\n", 
            function() {
        fs.appendFileSync("./final_results.txt", "Breakdown: " + "\n", 
        function() {});
        var keys = Array.from(totalMissedByType.keys());
        for (var i = 0; i < keys.length; i++) {
            fs.appendFileSync("./final_results.txt", "\n" + fileContents(keys[i], 
                numImagesByType, totalMissedByType, missedImagesByType), 
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

/**
 * 
 * @param {*} objectType 
 * @param {*} numImagesByType 
 * @param {*} totalMissedByType 
 * @param {*} missedImagesByType 
 * @return - 
 */
function fileContents(objectType, numImagesByType, totalMissedByType,
                      missedImagesByType) {
    var percentageIncorrect = 100*totalMissedByType.get(objectType)/
        numImagesByType.get(objectType);
    var percentageCorrect = (100 - Math.round(percentageIncorrect));
    var globalMessage = "object Type " + objectType + ": Missed " + 
        totalMissedByType.get(objectType) + " out of " + 
            numImagesByType.get(objectType) + " (" + percentageCorrect + "%)" +
                "\n";
    var granularMessage = "Images Missed: ";
    for (var i = 0; i < missedImagesByType.get(objectType).length; i++) {
        if (i != 0) {
            granularMessage += ", ";
        }
        granularMessage += missedImagesByType.get(objectType)[i]
            .substring(29,31);
    }
    granularMessage += "\n";
    return globalMessage + granularMessage;
}

/**
 * 
 */
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