var responses = new Array(6);

for (var i = 0; i < responses.length; i++) {
    responses[i] = false;
    console.log(responses[i]);
}

var numYesCheckBoxes = document.querySelectorAll(".yescheckboxes").length;
var numNoCheckBoxes = document.querySelectorAll(".nocheckboxes").length;

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