document.querySelector('.button').addEventListener('click', function() {
    console.log("submit button pressed");
    document.querySelector("#form").submit();
});