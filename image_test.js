// var elem1 = document.createElement('div');
// document.body.appendChild(elem1);
// elem1.classList.add("flexbox-container-new-row")
// elem1.innerHTML = "<div class='flexbox-container-new-row'><div class='checkbox-container'><div><input type='checkbox' class='yescheckboxes' id='1'> <label for='yes'>yes</label></div><input type='checkbox' class = 'nocheckboxes' id='1'> <label for='yes'>no</label></div><div class= 'checkbox-container'><img src='images/cell.jpg' id='cell'></div></div>";

var elem1 = document.createElement('div');
document.body.appendChild(elem1);
elem1.classList.add("flexbox-container-new-row")
elem1.innerHTML = "<div class='flexbox-container-new-row'><div class='checkbox-container'><div><input type='checkbox' class='yescheckboxes' id="+1+"> <label for='yes'>yes</label></div><input type='checkbox' class = 'nocheckboxes' id="+1+"> <label for='yes'>no</label></div><div class= 'checkbox-container'><img src='images/cell.jpg' id='cell'></div></div>";

var elem2 = document.createElement('div');
document.body.appendChild(elem2);
elem2.classList.add("flexbox-container-new-row")
elem2.innerHTML = "<div class='flexbox-container-new-row'><div class='checkbox-container'><div><input type='checkbox' class='yescheckboxes' id='2'> <label for='yes'>yes</label></div><input type='checkbox' class = 'nocheckboxes' id='2'> <label for='yes'>no</label></div><div class= 'checkbox-container'><img src='images/cell.jpg' id='cell'></div></div>";

var numYesCheckBoxes = document.querySelectorAll(".yescheckboxes").length;
var numNoCheckBoxes = document.querySelectorAll(".nocheckboxes").length;

var responses = new Array(6);

for (var i = 0; i < responses.length; i++) {
    responses[i] = false;
    console.log(responses[i]);
}

for (var i = 0; i < numYesCheckBoxes; i++) {
    document.querySelectorAll(".yescheckboxes")[i].addEventListener('change', function() {
        if (this.checked) {
            responses[2*this.id] = true;
        } else {
            responses[2*this.id] = false;
        }
        console.log(responses);
    });
}

for (var i = 0; i < numNoCheckBoxes; i++) {
    document.querySelectorAll(".nocheckboxes")[i].addEventListener('change', function() {
        if (this.checked) {
            responses[2*this.id + 1] = true;
        } else {
            responses[2*this.id + 1] = false;
        }
        console.log(responses);
    });
}