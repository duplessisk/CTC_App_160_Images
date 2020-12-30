var userResponses = [false,false,false,false,false,false,false,false,false,false];
var numYesCheckBoxes = document.querySelectorAll(".yescheckboxes").length;
var numNoCheckBoxes = document.querySelectorAll(".nocheckboxes").length;

for (var i = 0; i < numYesCheckBoxes; i++) {
    document.querySelectorAll(".yescheckboxes")[i].addEventListener('change', function() {
        idNum = Number(this.id.charAt(12));
        if (this.checked) {
            userResponses[2*idNum] = true;
            userResponses[2*idNum + 1] = false;
        }
        console.log(userResponses);
    });
}

for (var i = 0; i < numYesCheckBoxes; i++) {
    document.querySelectorAll(".nocheckboxes")[i].addEventListener('change', function() {
        idNum = Number(this.id.charAt(11));
        if (this.checked) {
            userResponses[2*idNum + 1] = true;
            userResponses[2*idNum] = false;
        }
        console.log(userResponses);
    });
}

// add event listner to submit button
document.querySelector('.button').addEventListener('click', function() {
    if (formContainsInvalidEntries()) {
         alert("Invalid submission. Please confirm that you have selected exactly one image per photo");
    } else {
        document.querySelector("#form").submit();
    }
});

// returns false is the form is properly filled out and ready to be submitted, returns true if the form is incomplete 
// or has invalid entries 
function formContainsInvalidEntries() {
    for (var i = 0; i < userResponses.length/2; i++) {
        if ((!userResponses[2*i] && !userResponses[2*i + 1]) || (userResponses[2*i] && userResponses[2*i + 1])) {
            return true;
        }
    }
    return false;
}