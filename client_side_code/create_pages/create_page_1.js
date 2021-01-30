for (var i = 0; i < 10; i++) {
    var newQuestion = document.createElement('div');
    document.querySelector("#form").appendChild(newQuestion);
    newQuestion.innerHTML = 
        "<div class='new-image-row'> "+ 
            "<div class='checkboxes-container'>" + 
                "<div class='checkbox-container'>" + 
                    "<label for='myRadioIdYes"+i+"' class='radio-btn-labels'>" + 
                        "<input type='radio' value='yes' name='radio"+i+"' class='default-radio-btns yes_check_boxes' id='myRadioIdYes"+i+"'>" + 
                        "<div class='custom-radio-btns'></div>" + 
                        "Cell" + 
                    "</label>" +
                "</div>" + 
                "<div id='buffer'></div>" + 
                "<div class='checkbox-container'>" + 
                "<label for='myRadioIdNo"+i+"' class='radio-btn-labels'>" + 
                    "<input type='radio' value='no' name='radio"+i+"' class='default-radio-btns no_check_boxes' id='myRadioIdNo"+i+"'>" + 
                    "<div class='custom-radio-btns'></div>" + 
                    "Not Cell" + 
                "</label>" +
            "</div>" + 
                "</div>" +
                "<div class= 'cell-image-row-container'>" + 
                    "<img src='/static/object_images/object0"+i+".png' alt='This image was originally intended to display a row of cell images' id='cellImage'>" + 
                "</div>" + 
            "</div>" + 
        "</div>"
}

var nextBtn = document.createElement('input');
nextBtn.type = "submit";
nextBtn.className = "btn";
nextBtn.id = "nextBtn";
nextBtn.name = "btn";
nextBtn.value = "Next";
document.querySelector("#form").appendChild(nextBtn);
