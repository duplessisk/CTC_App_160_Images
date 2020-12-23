var div1 = document.createElement('div');
document.querySelector("#form").appendChild(div1);
div1.classList.add("flexbox-container-new-row");
div1.innerHTML = "<div class='flexbox-container-new-row'><div class='checkbox-container'><div><input type='checkbox' name='yes0' class='yescheckboxes' id='0'> <label for='yes'>CTC</label></div><input type='checkbox' name='no0' class = 'nocheckboxes' id='0'> <label for='yes'>not-CTC</label></div><div class= 'checkbox-container'><img src='/static/images/ctcCell.JPG' id='cell'></div></div>";

var div2 = document.createElement('div');
document.querySelector("#form").appendChild(div2);
div2.classList.add("flexbox-container-new-row");
div2.innerHTML = "<div class='flexbox-container-new-row'><div class='checkbox-container'><div><input type='checkbox' name='yes1' class='yescheckboxes' id='1'> <label for='yes'>CTC</label></div><input type='checkbox' name='no1' class = 'nocheckboxes' id='1'> <label for='yes'>not-CTC</label></div><div class= 'checkbox-container'><img src='/static/images/notCTCcell.JPG' id='cell'></div></div>";


var responses = [false,false,false,false];
var numYesCheckBoxes = document.querySelectorAll(".yescheckboxes").length;
var numNoCheckBoxes = document.querySelectorAll(".nocheckboxes").length;

// yes-check-boxes event listener
for (var i = 0; i < numYesCheckBoxes; i++) {
    document.querySelectorAll(".yescheckboxes")[i].addEventListener('change', function() {
        if (this.checked) {
            responses[2*this.id] = true;
        } else {
            responses[2*this.id] = false;
        }
    });
}

// no-check-boxes event listener 
for (var i = 0; i < numNoCheckBoxes; i++) {
    document.querySelectorAll(".nocheckboxes")[i].addEventListener('change', function() {
        if (this.checked) {
            responses[2*this.id + 1] = true;
        } else {
            responses[2*this.id + 1] = false;
        }
    });
}

// submit button event listener
document.querySelector('#submitButtonID').addEventListener('click', function() {
    if (formNotFinished() || doubleResponses()) {
         alert("Invalid submission. Please confirm that you have selected exactly one image per photo");
    } else {
        document.querySelector("#form").submit();
    }
});

function formNotFinished() {
    for (var i = 0; i < responses.length/2; i++) {
        var yesResponse = responses[2*i];
        var noResponse = responses[2*i + 1];
        if (yesResponse == false && noResponse == false) {
            return true;
        } 
    }
    return false;
}

function doubleResponses() {
    for (var i = 0; i < responses.length/2; i++) {
        var yesResponse = responses[2*i];
        var noResponse = responses[2*i + 1];
        if (yesResponse == true && noResponse == true) {
            return true;
        } 
    }
    return false;
}