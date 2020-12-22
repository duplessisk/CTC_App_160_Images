const express = require("express");
const path = require("path");

const app = express();

app.use('/static', express.static('public'));

app.get("/", function(request,response) {
    response.sendFile(path.join(__dirname, '/image_test.html'));
});

app.listen(3000);