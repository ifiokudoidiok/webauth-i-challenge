const express = require("express");
// const bcrypt = require("bcryptjs");

const model = require("../data/db-model");
const restricted = require("../auth/restricted-middleware.js");

const router = express.Router();

router.get("/users", restricted, showUsers);

function showUsers(req, res) {
  model
    .getUsers()
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

module.exports = router;
