const fs = require('fs');

var cellInfo = [];
var fileContents = fs.readFileSync(__dirname + '/cell_information.csv');
var rows = fileContents.toString().split('\r\n');

console.log("rows");
console.log(rows);
console.log("rows length");
console.log(rows.length);

for (var i = 0; i < rows.length; i++) {
	cellInfo.push(rows[i].toString().split(','));
}

cellInfo = cellInfo.splice(1,cellInfo.length - 2);

console.log("cellInfo");
console.log(cellInfo);

cellTypes = [];
answerKeys = [ [], [], [], [], [] ];

//      page:   1    2    3    4    5
answerKeys = [ [] , [] , [] , [] , [] ];
for (var i = 0; i < cellInfo.length; i++) {
    cellTypes.push(cellInfo[i][1]);
    answerKeys[Math.floor(i/10)].push(cellInfo[i][2]);
}

console.log(cellTypes);
console.log(answerKeys);

exports.answerKeys = answerKeys;
exports.cellTypes = cellTypes;