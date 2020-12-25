async function getBlock() {
    let jsonBlocks;
    try {
      var response = await fetch("/static/incorrect_image_paths.json");
      jsonBlocks = await response.text();
      var arr = jsonObjectContents(jsonBlocks);
      buildDoc(arr);
    } catch (e) {
      // handle error
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
            var newImg = document.createElement('img');
            var s = arr[i];
            var imageNum = Number(s.charAt(25)) + 1;
            s = s.substring(1);
            s = s.substring(0,s.length-1);
            newImg.src = s;
            console.log(s);
            document.body.append("you got image " + imageNum + " incorrect: ");
            document.body.appendChild(newImg);
        }
    } else {
        document.body.append("you got no images incorrect!");
    }
}
