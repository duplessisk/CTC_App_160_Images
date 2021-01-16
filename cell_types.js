const fs = require('fs');

var cellInfo = [];
var fileContents = fs.readFileSync(__dirname + '/cell_information.csv');
var rows = fileContents.toString().split('\r\n');

var newRows = rows[0].substring(16,rows[0].length);
console.log("newRows");
console.log(newRows);
console.log("newRows.charAt(0)");
console.log(newRows.charAt(0));
console.log("newRows.charAt(5)");
console.log(newRows.charAt(5));
console.log("newRows.charAt(10)");
console.log(newRows.charAt(10));


for (var i = 0; i < rows.length; i++) {
	cellInfo.push(rows[i].toString().split(','));
}

cellInfo = cellInfo.splice(1,cellInfo.length - 2);

cellTypes = [];
answerKeys = [ [], [], [], [], [] ];

//      page:   1    2    3    4    5
answerKeys = [ [] , [] , [] , [] , [] ];
for (var i = 0; i < cellInfo.length; i++) {
    cellTypes.push(cellInfo[i][1]);
    answerKeys[Math.floor(i/10)].push(cellInfo[i][2]);
}

exports.answerKeys = answerKeys;
exports.cellTypes = cellTypes;