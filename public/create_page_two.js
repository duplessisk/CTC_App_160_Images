for (var i = 5; i < 10; i++) {
    var newQuestion = document.createElement('div');
    document.querySelector("#form").appendChild(newQuestion);
    newQuestion.innerHTML = 
        "<div class='new-image-row'> "+ 
            "<div class='checkboxes-container'>" + 
                "<div class='checkbox-container'>" + 
                    "<label for='myRadioIdYes"+(i-5)+"' class='radio'>" + 
                        "<input type='radio' value='yes' name='radio"+(i-5)+"' class='radio__input yes_check_boxes' id='myRadioIdYes"+(i-5)+"'>" + 
                        "<div class='radio__radio'></div>" + 
                        "CTC" + 
                    "</label>" +
                "</div>" + 
                "<div id='buffer'></div>" + 
                "<div class='checkbox-container'>" + 
                "<label for='myRadioIdNo"+(i-5)+"' class='radio'>" + 
                    "<input type='radio' value='no' name='radio"+(i-5)+"' class='radio__input no_check_boxes' id='myRadioIdNo"+(i-5)+"'>" + 
                    "<div class='radio__radio'></div>" + 
                    "Not-CTC" + 
                "</label>" +
            "</div>" + 
                "</div>" +
                "<div class= 'cell-row-image-container'>" + 
                    "<img src='/static/cell_images/cell"+i+".JPG' alt='This image was originally intended to display a row of cell images' id='cellImage'>" + 
                "</div>" + 
            "</div>" + 
        "</div>"
}

var previousButtonDiv = document.createElement('div');
previousButtonDiv.id = "previousButtonDiv";
document.querySelector("#form").appendChild(previousButtonDiv);

var previousButton = document.createElement('input');
previousButton.type = "submit";
previousButton.className = "button";
previousButton.id = "previousButton";
previousButton.name = "button";
previousButton.value = "Previous";
document.querySelector("#previousButtonDiv").appendChild(previousButton);

var continueButtonDiv = document.createElement('div');
continueButtonDiv.id = "continueButtonDiv";
document.querySelector("#form").appendChild(continueButtonDiv);

var continueButton = document.createElement('input');
continueButton.type = "submit";
continueButton.className = "button";
continueButton.id = "continueButton";
continueButton.name = "button";
continueButton.value = "Continue";
document.querySelector("#continueButtonDiv").appendChild(continueButton);