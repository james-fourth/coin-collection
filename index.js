const express = require("express");
const bodyParser = require("body-parser");

const app = express();

 app.use(bodyParser.urlencoded({extended: true}));

 app.listen(3000, function() {
   console.log("The server is listening on port 3000 ");
 })
