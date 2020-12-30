for (var i = 0; i < 5; i++) {
    var newDiv = document.createElement('div');
    document.querySelector("#form").appendChild(newDiv);
    newDiv.innerHTML = 
        "<div class='new-image-row'> "+ 
            "<div class='checkboxes-container'>" + 
                "<div class='checkbox-container'>" + 
                    "<label for='myRadioIdYes"+i+"' class='radio'>" + 
                        "<input type='radio' value='yes' name='radio"+i+"' class='radio__input yescheckboxes' id='myRadioIdYes"+i+"'>" + 
                        "<div class='radio__radio'></div>" + 
                        "CTC" + 
                    "</label>" +
                "</div>" + 
                "<div id='buffer'></div>" + 
                "<div class='checkbox-container'>" + 
                "<label for='myRadioIdNo"+i+"' class='radio'>" + 
                    "<input type='radio' value='no' name='radio"+i+"' class='radio__input nocheckboxes' id='myRadioIdNo"+i+"'>" + 
                    "<div class='radio__radio'></div>" + 
                    "Not-CTC" + 
                "</label>" +
            "</div>" + 
                // "<div class='checkbox-container'>" + 
                //     "<label for='myRadioId' class='radio'>" + 
                //         "<input type='radio' value='yes' name='radio"+i+"' class='radio__input' 'yescheckboxes' id='myRadioId'>" + 
                //         "<div class='radio__radio'></div>" + 
                //         "Not-CTC" + 
                //     "</label>" +
                // "</div>" + 
                "</div>" +
                "<div class= 'cell-row-image-container'>" + 
                    "<img src='/static/cell_images/cell"+i+".JPG' alt='This image was originally intended to display a row of cell images' id='cellImage'>" + 
                "</div>" + 
            "</div>" + 
        "</div>"
}
