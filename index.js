const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));

app.listen(3000, function() {
  console.log("The server is listening on port 3000 ");
})

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html")
})

app.post("/", function(req, res) {

  let crypto = req.body.crypto;
  let fiat = req.body.fiat;
  let baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"

  let finalUrl = baseUrl + crypto + fiat;

  request(finalUrl, function(error, response, body) {
    let currencyRequestBody = JSON.parse(body);
    let currencyPrice = currencyRequestBody.last;

    res.send("<h1>Coin Collection</h1><p>The price of " + crypto + " in " + fiat + " is " + currencyPrice + "</p>");
  })
})
