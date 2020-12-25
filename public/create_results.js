const incorrectImages = require('../server');

var wrImages = wrongImages.wrongImages;
for (var i = 0; i < wrImages.length; i++) {
    if (wrImages[i]) {
        var newDiv = document.createElement('div');
        document.querySelector("#form").appendChild(newDiv);
        newDiv.innerHTML = "<div> <img src='/static/cell_images/cell"+i+".JPG' alt='This image was originally intended to display a row of cell images' id='cell'></div></div>";
    }
}
