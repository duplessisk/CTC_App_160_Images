async function getBlock() {
    let jsonBlocks;
    try {
        var response = await fetch("/static/incorrect_image_paths.json");
        jsonBlocks = await response.text();
        var arr = jsonObjectContents(jsonBlocks);
        buildDoc(arr);
    } catch (e) {
        console.error(e);
    }
}

getBlock();

function jsonObjectContents(jsonBlocks) {
    var imagePathStrings = "";
    for (let i in jsonBlocks) {
        let t = jsonBlocks[i];
        if (t != '{') {
            imagePathStrings += t;
        }
    } 
    var arr = imagePathStrings.split("}");
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].substring(12);
    }
    return arr;
}

function buildDoc(arr) {
    if (arr.length-1 != 0) {
        for (var i = 0; i < arr.length-1; i++) {
            console.log("round: " + i);
            var newImg = document.createElement('img');
            newImg.id="resultsImg";
            var s = arr[i];
            console.log("missed image path: " + s);
            console.log(s);
            var imageNum = s.substring(26,28);
            s = s.substring(1);
            s = s.substring(0,s.length-1);
            newImg.src = s;
            var p = document.createElement('p');
            p.id = "resultsMessage";
            p.innerHTML = "You got image  " + imageNum + " incorrect";
            document.body.append(p);

            document.body.appendChild(newImg);

            var bottomPadding = document.createElement('div');
            bottomPadding.id = "bottomPadding";
            document.body.appendChild(bottomPadding);
        }
    } else {
        document.body.append("you got no images incorrect!");
    }
}