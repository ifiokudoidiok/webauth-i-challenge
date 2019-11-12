const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const session = require("express-session");
const KnexSessionStore = require("connect-session-knex")(session);

const userRouter = require("../config/router");
const authRouter = require("../auth/auth-router");

const server = express();

const sessionConfig = {
  name: "ladygaga",
  secret: "make it a little long and keep it safe!",
  cookie: {
    maxAge: 1000 * 60 * 60, // you need it if the cookie is to survive !!
    secure: false, // with secure, the cookie only gets set when https !!
    httpOnly: false
  },
  resave: false,
  saveUninitialized: false,
  store: new KnexSessionStore({
    knex: require("../data/db-config"),
    tablename: "sessions",
    sidfieldname: "sid",
    createtable: true,
    clearInterval: 1000 * 60 * 60
  })
};

server.use(helmet());
server.use(express.json());
server.use(cors());
server.use(session(sessionConfig));
server.get("/", logger, (req, res) => {
  res.send(
    "<h1>Lets Get this party started!<h1><p> navigate to /api/users to begin</p>"
  );
});
server.use("/api", logger, userRouter);
server.use("/api", logger, authRouter);

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.host}`
  );

  next();
}

module.exports = server;
