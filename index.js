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

  let tickerRequestString = "https://apiv2.bitcoinaverage.com/indices/global/ticker/" + req.body.crypto + req.body.fiat;

  request(tickerRequestString, function(error, response, body) {
    let selectionPriceString = "";
    let selectionPriceParsed = JSON.parse(body);

    selectionPriceString = selectionPriceParsed.last;

    res.send("<h1>Coin Collection</h1><p>The price of " + req.body.crypto + " in " + req.body.fiat + " is " + selectionPriceString + "</p>");
  })
})
