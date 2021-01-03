for (var i = 0; i < 5; i++) {
    var newQuestion = document.createElement('div');
    document.querySelector("#form").appendChild(newQuestion);
    newQuestion.innerHTML = 
        "<div class='new-image-row'> "+ 
            "<div class='checkboxes-container'>" + 
                "<div class='checkbox-container'>" + 
                    "<label for='myRadioIdYes"+i+"' class='radio'>" + 
                        "<input type='radio' value='yes' name='radio"+i+"' class='radio__input yes_check_boxes' id='myRadioIdYes"+i+"'>" + 
                        "<div class='radio__radio'></div>" + 
                        "CTC" + 
                    "</label>" +
                "</div>" + 
                "<div id='buffer'></div>" + 
                "<div class='checkbox-container'>" + 
                "<label for='myRadioIdNo"+i+"' class='radio'>" + 
                    "<input type='radio' value='no' name='radio"+i+"' class='radio__input no_check_boxes' id='myRadioIdNo"+i+"'>" + 
                    "<div class='radio__radio'></div>" + 
                    "Not Cell" + 
                "</label>" +
            "</div>" + 
                "</div>" +
                "<div class= 'cell-row-image-container'>" + 
                    "<img src='/static/cell_images/cell"+i+".JPG' alt='This image was originally intended to display a row of cell images' id='cellImage'>" + 
                "</div>" + 
            "</div>" + 
        "</div>"
}

var nextButton = document.createElement('input');
nextButton.type = "submit";
nextButton.className = "button";
nextButton.id = "nextButton";
nextButton.name = "button";
nextButton.value = "Next";
document.querySelector("#form").appendChild(nextButton);
