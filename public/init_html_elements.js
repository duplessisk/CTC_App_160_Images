var div1 = document.createElement('div');
document.querySelector("#form").appendChild(div1);
div1.classList.add("flexbox-container-new-row");
div1.innerHTML = "<div class='flexbox-container-new-row'><div class='checkbox-container'><div><input type='checkbox' name='yes0' class='yescheckboxes' id='0'> <label for='yes'>CTC</label></div><input type='checkbox' name='no0' class = 'nocheckboxes' id='0'> <label for='yes'>not-CTC</label></div><div class= 'checkbox-container'><img src='/static/images/ctcCell.JPG' alt='This image was originally intended to display a row of cell images' id='cell'></div></div>";

var div2 = document.createElement('div');
document.querySelector("#form").appendChild(div2);
div2.classList.add("flexbox-container-new-row");
div2.innerHTML = "<div class='flexbox-container-new-row'><div class='checkbox-container'><div><input type='checkbox' name='yes1' class='yescheckboxes' id='1'> <label for='yes'>CTC</label></div><input type='checkbox' name='no1' class = 'nocheckboxes' id='1'> <label for='yes'>not-CTC</label></div><div class= 'checkbox-container'><img src='/static/images/notCTCcell.JPG' alt='This image was originally intended to display a row of cell images' id='cell'></div></div>";