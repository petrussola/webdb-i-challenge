const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  db("accounts")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res
        .status(500)
        .json({
          message: `There has been an error getting accounts: ${error.message}`
        });
    });
});

module.exports = server;
