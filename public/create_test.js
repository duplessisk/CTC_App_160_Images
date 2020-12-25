for (var i = 1; i < 3; i++) {
    var newDiv = document.createElement('div');
    document.querySelector("#form").appendChild(newDiv);
    newDiv.innerHTML = "<div class='flexbox-container-new-row'><div class='checkbox-container'><div><input type='checkbox' name='yes"+i+"' class='yescheckboxes' id='0'> <label for='yes'>CTC</label></div><input type='checkbox' name='no"+i+"' class = 'nocheckboxes' id="+i+"> <label for='yes'>not-CTC</label></div><div class= 'checkbox-container'><img src='/static/cell_images/cell"+i+".JPG' alt='This image was originally intended to display a row of cell images' id='cell'></div></div>";
}

