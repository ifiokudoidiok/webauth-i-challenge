const express = require("express");
const bcrypt = require("bcryptjs");

const model = require("../data/db-model");
// const restricted = require('../auth/restricted-middleware.js');

const authRouter = express.Router();

authRouter.post("/register", register);
authRouter.post("/login", login);
authRouter.get('/logout', logout )

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

function logout(req, res) {
    if(req.session && req.session.user) {
      req.session.destroy( err =>{
        if(err) {
          res.json({message: 'No going today!'})
        } else {
          res.json({message:'see you some other time'})
        }
      })
    }else {
      res.end()
    }
  }

function login(req, res) {
    const {name, password} = req.body
    model.login({name})
    .first()
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)){
        req.session.user = user;
        res.status(200).json({
          message: `Welcome ${user.name}!`,
        });
      } else{
        res.status(401).json({message: 'Invalid Credentials'})
      }
    })
    .catch(error => {
      res.status(500).json({message: error.message})
    })
  }

  module.exports = authRouter;
