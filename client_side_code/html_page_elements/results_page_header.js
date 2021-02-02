// Creates the score header on the results page.

window.addEventListener('scroll', function() {
    if (document.documentElement.scrollTop > 5) {
        document.getElementById("pageHeaderDiv").classList.add('small');
    } else {
        document.getElementById("pageHeaderDiv").classList.remove('small');
    }
});