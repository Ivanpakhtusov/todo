const session = require("express-session");
const FileStore = require("session-file-store")(session);

const sessionConfig = {
  store: new FileStore(),
  name: "user_sid",
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 10,
    httpOnly: false,
  },
};

module.exports = sessionConfig;
