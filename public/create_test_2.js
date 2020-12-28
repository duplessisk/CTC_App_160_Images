for (var i = 5; i < 10; i++) {
    var newDiv = document.createElement('div');
    document.querySelector("#form").appendChild(newDiv);
    newDiv.innerHTML = "<div class='flexbox-container-new-row'><div class='checkbox-container'><div><input type='checkbox' name='yes"+(i-4)+"' class='checkbox yescheckboxes' id="+(i-4)+"> <label for='yes' class='checkbox-label'>CTC</label></div><input type='checkbox' name='no"+(i-4)+"' class = 'checkbox nocheckboxes' id="+(i-4)+"> <label for='yes' class='checkbox-label'>Not-CTC</label></div><div class= 'cell-container'><img src='/static/cell_images/cell"+i+".JPG' alt='This image was originally intended to display a row of cell images' id='cell'></div></div>";
}