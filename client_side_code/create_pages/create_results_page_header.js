window.addEventListener('scroll', function() {
    console.log(document.documentElement.scrollTop);
    if (document.documentElement.scrollTop > 5) {
        console.log("add small");
        document.getElementById("pageHeaderDiv").classList.add('small');
    } else {
        console.log("remove small");
        document.getElementById("pageHeaderDiv").classList.remove('small');
    }
});