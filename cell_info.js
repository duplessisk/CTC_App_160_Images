const fs = require("fs");
const path = require("path");

const getAllFiles = function(dirPath, arrayOfFiles) {
    files = fs.readdirSync(dirPath)
  
    arrayOfFiles = arrayOfFiles || []
  
    files.forEach(function(file) {
      if (fs.statSync(dirPath + "/" + file).isDirectory()) {
        arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles)
      } else {
        arrayOfFiles.push(path.join(__dirname, dirPath, "/", file))
      }
    })
  
    return arrayOfFiles
}

const result = getAllFiles("public/cells");

img1Path = result[0];
img1Path = path.relative(__dirname + "/public",img1Path);
img1Path = "\\static\\" + img1Path;

img2Path = result[1];
img2Path = path.relative(__dirname + "/public",img2Path);
img2Path = "\\static\\" + img2Path;

module.exports.img1Path = img1Path;
module.exports.img2Path = img2Path;
