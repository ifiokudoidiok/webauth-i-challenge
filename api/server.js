const express = require('express');


const userRouter = require('../config/router');

const server = express();

server.use(express.json());
server.get('/', logger, (req, res) => {
    res.send('<h1>Lets Get this party started!<h1><p> navigate to /api/users to begin</p>')
    })
server.use('/api', logger, userRouter);



function logger(req, res, next) {
    console.log(
      `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.host}`
    );
  
    next();
  }

module.exports = server;