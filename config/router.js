const express = require("express");
const bcrypt = require('bcryptjs');

const model = require("../data/db-model");

const router = express.Router();

router.post('/', register);
router.post('/', login);
router.get('/', showUsers);

function register(req, res) {
const  { name, password } = req.body;
const hash = bcrypt.hashSync(password, 11);

const newUser = {
    name: name,
    password: hash
}

model.register(newUser)
.then(saved => {
    res.status(201).json(saved)
})
.catch(err => {
    res.status(500).json(err)
})

}

function login(req,res) {
    const { name, password} = req.body;

}

function showUsers(req, res) {
model.getUsers()
.then(users => {
    res.status(200).json(users)
})
.catch(err => {
    res.status(500).json(err)
})

}


module.exports = router;