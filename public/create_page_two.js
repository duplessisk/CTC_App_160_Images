// for (var i = 5; i < 10; i++) {
//     var newDiv = document.createElement('div');
//     document.querySelector("#form").appendChild(newDiv);
//     newDiv.innerHTML = 
//         "<div class='new-image-row'> "+ 
//             "<div class='checkboxes-container'>" + 
//                 "<div>" + 
//                     "<input type='checkbox' name='yes"+(i-5)+"' class='checkbox yescheckboxes' id="+(i-5)+"> <label for='yes' class='checkbox-label'>CTC</label>" + 
//                 "</div>" + 
//                     "<input type='checkbox' name='no"+(i-5)+"' class = 'checkbox nocheckboxes' id="+(i-5)+"> <label for='yes' class='checkbox-label'>Not-CTC</label>" + 
//                 "</div>" +
//                 "<div class= 'cell-row-image-container'>" + 
//                     "<img src='/static/cell_images/cell"+i+".JPG' alt='This image was originally intended to display a row of cell images' id='cellImage'>" + 
//                 "</div>" + 
//             "</div>" + 
//         "</div>"
// }

for (var i = 5; i < 10; i++) {
    var newDiv = document.createElement('div');
    document.querySelector("#form").appendChild(newDiv);
    newDiv.innerHTML = 
        "<div class='new-image-row'> "+ 
            "<div class='checkboxes-container'>" + 
                "<div class='checkbox-container'>" + 
                    "<label for='myRadioIdYes"+(i-5)+"' class='radio'>" + 
                        "<input type='radio' value='yes' name='radio"+(i-5)+"' class='radio__input yescheckboxes' id='myRadioIdYes"+(i-5)+"'>" + 
                        "<div class='radio__radio'></div>" + 
                        "CTC" + 
                    "</label>" +
                "</div>" + 
                "<div id='buffer'></div>" + 
                "<div class='checkbox-container'>" + 
                "<label for='myRadioIdNo"+(i-5)+"' class='radio'>" + 
                    "<input type='radio' value='no' name='radio"+(i-5)+"' class='radio__input nocheckboxes' id='myRadioIdNo"+(i-5)+"'>" + 
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