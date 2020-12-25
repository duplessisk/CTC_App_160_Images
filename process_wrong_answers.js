const imagePaths = require("./cell_info");

var wAns = wrongAnswers.wrongAnswers;
var incorrectImages = [];
for (var i = 0; i < wAns.length; i++) {
    if (wAns[i]) {
        incorrectImages.push(wAns[i]);
    }
}

module.exports.incorrectImages = incorrectImages;
