const fs = require('fs');

var cellInfo = [];
// var fileContents = fs.readFileSync(path.join(__dirname + '/cell_information.csv'));
var fileContents = fs.readFileSync(__dirname + '/cell_information.csv');

// var fileContents = fs.readFileSync('./cell_information.csv');

var rows = fileContents.toString().split('\r\n');

for (var i = 0; i < rows.length; i++) {
    console.log(rows[i]);
	cellInfo.push(rows[i].toString().split(','));
}

console.log(cellInfo.length);

cellInfo = cellInfo.splice(1,cellInfo.length - 2);

cellTypes = [];
answerKeys = [ [], [], [], [], [] ];

//      page:   1    2    3    4    5
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
console.log("in cellTypes: " + answerKeys.length);
console.log("in cellTypes: " + cellTypes.length);
exports.answerKeys = answerKeys;
exports.cellTypes = cellTypes;