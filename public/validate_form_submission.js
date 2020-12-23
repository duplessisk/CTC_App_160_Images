var userResponses = [false,false,false,false];
var numYesCheckBoxes = document.querySelectorAll(".yescheckboxes").length;
var numNoCheckBoxes = document.querySelectorAll(".nocheckboxes").length;

var checkboxClasses = [".yescheckboxes",".nocheckboxes"];

for (var i = 0; i < 2; i++) {
    for (var j = 0; j < numYesCheckBoxes; j++) {
        document.querySelectorAll(classes[i])[j].addEventListener('change', function() {
            if (this.checked) {
                responses[2*this.id] = true;
            } else {
                responses[2*this.id] = false;
            }
            console.log(responses);
        });
    }
}

// submit button event listener
document.querySelector('#submitButtonID').addEventListener('click', function() {
    if (formContainsInvalidEntries()) {
         alert("Invalid submission. Please confirm that you have selected exactly one image per photo");
    } else {
        document.querySelector("#form").submit();
    }
});

function formContainsInvalidEntries() {
    for (var i = 0; i < responses.length/2; i++) {
        if ((!responses[2*i] && !responses[2*i + 1]) || (responses[2*i] && responses[2*i + 1])) {
            return true;
        }
    }
    return false;
}