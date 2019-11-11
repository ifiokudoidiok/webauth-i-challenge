const express = require("express");
const bcrypt = require("bcryptjs");

const model = require("../data/db-model");

const router = express.Router();

router.post("/register", register);
router.post("/login", restricted, login);
router.get("/users",restricted, showUsers);

function register(req, res) {
  const { name, password } = req.body;
  const hash = bcrypt.hashSync(password, 11);

  const newUser = {
    name: name,
    password: hash
  };

  model
    .register(newUser)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(err => {
      res.status(500).json(err);
    });
}

function login(req, res) {
  const { name} = req.headers;
  res.status(200).json({ message: `Welcome ${name}!` });
}

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



//middleware
function restricted(req, res, next) {
    const {name, password} = req.headers
    model.login({name})
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        next()
      } else{
        res.status(401).json({message: 'Invalid Credentials'})
      }
    })
    .catch(error => {
      res.status(500).json({message: error.message})
    })
  }

module.exports = router;
