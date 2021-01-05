for (var i = 0; i < 10; i++) {
    var newQuestion = document.createElement('div');
    document.querySelector("#form").appendChild(newQuestion);
    newQuestion.innerHTML = 
        "<div class='new-image-row'> "+ 
            "<div class='checkboxes-container'>" + 
                "<div class='checkbox-container'>" + 
                    "<label for='myRadioIdYes"+i+"' class='radio-button-labels'>" + 
                        "<input type='radio' value='yes' name='radio"+i+"' class='default-radio-buttons yes_check_boxes' id='myRadioIdYes"+i+"'>" + 
                        "<div class='custom-radio-buttons'></div>" + 
                        "CTC" + 
                    "</label>" +
                "</div>" + 
                "<div id='buffer'></div>" + 
                "<div class='checkbox-container'>" + 
                "<label for='myRadioIdNo"+i+"' class='radio-button-labels'>" + 
                    "<input type='radio' value='no' name='radio"+i+"' class='default-radio-buttons no_check_boxes' id='myRadioIdNo"+i+"'>" + 
                    "<div class='custom-radio-buttons'></div>" + 
                    "Not-CTC" + 
                "</label>" +
            "</div>" + 
                "</div>" +
                "<div class= 'cell-image-row-container'>" + 
                    "<img src='/static/cell_images/cell2"+i+".JPG' alt='This image was originally intended to display a row of cell images' id='cellImage'>" + 
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

var nextButtonDiv = document.createElement('div');
nextButtonDiv.id = "nextButtonDiv";
document.querySelector("#form").appendChild(nextButtonDiv);

var nextButton = document.createElement('input');
nextButton.type = "submit";
nextButton.className = "button";
nextButton.id = "nextButton";
nextButton.name = "button";
nextButton.value = "Next";
document.querySelector("#nextButtonDiv").appendChild(nextButton);