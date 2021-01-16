const fs = require('fs');
var cellInfo = [];
// var fileContents = fs.readFileSync(path.join(__dirname + '/cell_information.csv'));
var fileContents = fs.readFileSync(__dirname + '/cell_information.csv');

// var rows = fileContents.toString().split('\r');
var rows = fileContents.toString().split(',');
console.log("rows: ");
console.log(rows);
for (var i = 0; i < rows.length; i++) {
    cellInfo.push(rows[i].toString().split(','));
    console.log(i);
}

cellInfo = cellInfo.splice(1,cellInfo.length - 2);
cellTypes = [];
answerKeys = [ [], [], [], [], [] ];
//     page:   1    2    3    4    5
answerKeys = [ [] , [] , [] , [] , [] ];
for (var i = 0; i < cellInfo.length; i++) {
    cellTypes.push(cellInfo[i][1]);
    answerKeys[Math.floor(i/10)].push(cellInfo[i][2]);
}

// answerKeys = [["y","y","y","y","y","y","y","y","y","y"], 
//                ["y","y","y","y","y","y","y","y","y","y"],
//                ["y","y","y","y","y","y","y","y","y","y"],
//                ["y","y","y","y","y","y","y","y","y","y"],
//                ["y","y","y","y","y","y","y","y","y","y"]];
// cellTypes = ["A","A","A","A","A","A","A","A","A","A",
//              "B","B","B","B","B","B","B","B","B","B",
//              "C","C","C","C","C","C","C","C","C","C",
//              "D","D","D","D","D","D","D","D","D","D",
//              "E","E","E","E","E","E","E","E","E","E",
//             ]
exports.answerKeys = answerKeys;
exports.cellTypes = cellTypes;