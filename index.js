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
  let amount = req.body.amount;
  // let baseUrl = "https://apiv2.bitcoinaverage.com/indices/global/ticker/"

  // let finalUrl = baseUrl + crypto + fiat;

  let options = {
    uri: "https://apiv2.bitcoinaverage.com/convert/global",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  }

  request(options, function(error, response, body) {
    console.log(body);
    let currencyRequestBody = JSON.parse(body);
    let currencyPrice = currencyRequestBody.price;

    res.send("<h1>Coin Collection</h1><p>The price of " + amount + " " + crypto + " in " + fiat + " is " + currencyPrice + "</p>");
  })
})
