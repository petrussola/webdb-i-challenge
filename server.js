const express = require("express");

const db = require("./data/dbConfig.js");

const server = express();

server.use(express.json());

// ENDPOINTS

// GET METHOD

server.get("/", (req, res) => {
  db("accounts")
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: `There has been an error getting accounts: ${error.message}`
      });
    });
});

// GET ACCOUNT METHOD

server.get("/:id", (req, res) => {
  db("accounts")
    .where({ id: req.params.id })
    .then(data => {
      res.status(200).json(data);
    })
    .catch(error => {
      res.status(500).json({
        message: `There has been an error getting account with id ${req.params.id}: ${error.message}`
      });
    });
});

// POST METHOD

server.post("/", (req, res) => {
  db("accounts")
    .insert(req.body)
    .then(data => {
      res.status(200).json({...req.body, id: data[0]});
    })
    .catch(error => {
      console.log(error.message);
    });
});

module.exports = server;
