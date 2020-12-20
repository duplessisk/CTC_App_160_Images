// for (var i = 0; i < 3; i++) {
//     var element = document.getElementById("new-row");
//     var clone = element.cloneNode(true);
//     element.after(clone);
// }
var responses = new Array(4);
for (var i = 0; i < responses.length; i++) {
    responses[i] = null;
    console.log(responses[i]);
}

const yesBox = document.querySelector('#yes');
const noBox = document.querySelector('#no');
var submitButton = document.querySelector(".submitbutton");

for (var i = 0; i < document.querySelectorAll("yescheckboxes").length; i++) {
    document.querySelectorAll("yescheckboxes")[i].addEventListener('change', function() {
        alert("I got checked");
        // if (this.id === "1") {
        //     alert("first yes check box checked");
        // } else if (this.id === "2") {
        //     alert("second yes box checked")
        // } else {
        //     alert("third yes box checked");
        // }
    });
}

// yesBox.addEventListener('change',function(e) {
//     if (yesBox.checked) {
//         responses[0] = true;
//         console.log(responses[0]);
//     }
// });

// noBox.addEventListener('change',function(e) {
//     if (noBox.checked) {
//         responses[0] = false;
//         console.log(responses[0]);
//     }
// });

// submitButton.addEventListener("click",function(e) {
//     var numCorrect = 0;
//     for (var i = 0; i < responses.length ; i++) {
//         if (responses[i]) {
//             numCorrect++;
//         }
//     }
//     var score = numCorrect/1;
//     alert("score: " + score);
// });
