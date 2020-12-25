async function getBlock() {
    let jsonBlocks;
    try {
      var response = await fetch("/static/incorrect_image_paths.json");
      jsonBlocks = await response.text();
      var arr = jsonObjectContents(jsonBlocks);
      console.log("I'm in 1");
      buildDoc(arr);
    } catch (e) {
      // handle error
      console.error(e);
    }
  }

  getBlock();

function jsonObjectContents(jsonBlocks) {
    console.log(jsonBlocks);
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
    console.log("Im in 2");
    console.log(arr.length);
    for (var i = 0; i < arr.length-1; i++) {
        var newImg = document.createElement('img');
        console.log("test: " + '/static/cell_images/cell1.JPG');
        var s = arr[i];
        s = s.substring(1);
        s = s.substring(0,s.length-1);
        console.log("real: " + s);
        // newImg.src = arr[i];
        // newImg.src = '/static/cell_images/cell1.JPG';
        newImg.src = s;
        document.body.appendChild(newImg);
    }
}