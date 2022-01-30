const express = require("express");
require("dotenv").config();
const axios = require("axios");
const cors = require("cors");
const bodyParser = require("body-parser");

const HOST = "localhost";
const PORT = "5555";
const KEY = process.env.API_KEY;

const server = express();

server.use(cors());
server.use(bodyParser.json());
server.use(express.json());
server.use(express.urlencoded());

server.get("/api/news", (req, res) => {
  axios
    .get(`https://cryptopanic.com/api/v1/posts/?auth_token=${KEY}&public=true`)
    .then((responseObject) => {
      res.status(200).send(responseObject.data.results);
    })
    .catch((error) => {
      console.log(error);
    });
});

server.get("/api/trade", (req, res) => {
  axios
    .get(
      `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false`
    )
    .then((responseObject) => {
      res.status(200).send(responseObject.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

server.get("/api/market-movers", (req, res) => {
  console.log(req.query.date);

  axios
    .get(
      `https://api.coingecko.com/api/v3/coins/${req.query.coin}/history?date=${req.query.date}`
    )
    .then((responseObject) => {
      res.status(200).send(responseObject.data);
    })
    .catch((error) => {
      console.log(error);
    });
});

server.listen(PORT, (err) => {
  if (err) {
    console.log("There was a problem with the server: ", err);
  } else {
    console.log("Crypto Server says hi from ", "http://" + HOST + ":" + PORT);
  }
});
