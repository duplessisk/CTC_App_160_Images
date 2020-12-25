const fs = require("fs");
const wrongImages = require("./server");

const answerKey = wrongImages.answerKey;
console.log(answerKey);
var userResponses = wrongImages.userResponses;
var wrongAnswerObjects = []; // for JSON file

for (var i = 0; i < answerKey.length/2; i++) {
    if (answerKey[i] != userResponses[i] || answerKey[i+1] != answerKey[i+1]) {
        //write image path to JSON file
        var wrongObject = {
            imagePath: '/static/cell_images/cell' + String(i) + '.JPG'
        }
        console.log(wrongObject.imagePath);
        wrongAnswerObjects.push(wrongObject);
    }
}