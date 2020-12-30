for (var i = 0; i < 5; i++) {
    var newDiv = document.createElement('div');
    document.querySelector("#form").appendChild(newDiv);
    newDiv.innerHTML = 
        "<div class='new-image-row'> "+ 
            "<div class='checkboxes-container'>" + 
                "<div class='checkbox-container'>" + 
                    "<input type='radio' value='yes"+i+"' name='radio"+i+"' class='checkbox yescheckboxes' id="+i+"> <label for='yes' class='checkbox-label'>CTC</label>" + 
                "</div>" + 
                "<div id='buffer'></div>" + 
                "<div class='checkbox-container'>" + 
                    "<input type='radio' name='radio"+i+"' value='no"+i+"' class = 'checkbox nocheckboxes' id="+i+"> <label for='yes' class='checkbox-label'>Not-CTC</label>" + 
                "</div>" +
                "</div>" +
                "<div class= 'cell-row-image-container'>" + 
                    "<img src='/static/cell_images/cell"+i+".JPG' alt='This image was originally intended to display a row of cell images' id='cellImage'>" + 
                "</div>" + 
            "</div>" + 
        "</div>"
}
