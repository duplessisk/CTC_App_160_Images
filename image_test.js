// create flexbox-container-new-row div html elements
for (var i = 0; i < 3; i++) {
    var newDiv = document.createElement('div');
    document.body.appendChild(newDiv);
    newDiv.classList.add("flexbox-container-new-row");
    newDiv.innerHTML = "<div class='flexbox-container-new-row'><div class='checkbox-container'><div><input type='checkbox' class='yescheckboxes' id="+i+"> <label for='yes'>yes</label></div><input type='checkbox' class = 'nocheckboxes' id="+i+"> <label for='yes'>no</label></div><div class= 'checkbox-container'><img src='images/cell.jpg' id='cell'></div></div>";
}

// create button
var submitButton = document.createElement('button');
var submitButtonText = document.createTextNode('Submit');
submitButton.appendChild(submitButtonText);
submitButton.classList.add("submitbutton");
document.body.appendChild(submitButton);

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