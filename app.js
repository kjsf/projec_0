const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const errors = require("./config/errors");
const helmet = require("helmet");
const passport = require("passport");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;
const db = process.env.MONGO_URI;

// middlewares
app.use(morgan("common"));
app.use(helmet());
app.use(express.json());
app.use(passport.initialize());
app.use(express.static("public"));
app.set("view engine", "ejs");

// import routes
const usersRoute = require("./routes/usersRoute");
const itemsRoute = require("./routes/itemsRoute");

// test
app.get("/", (req, res) => {
  res.render("index");
});
app.get("/login", (req, res) => {
  res.render("login");
});
app.get("/signup", (req, res) => {
  res.render("signup");
});
app.get("/submit", (req, res) => {
  res.render("submit");
});

// routes
app.use("/user", usersRoute);
app.use("/items", itemsRoute);

// error handling
app.use(errors.notFound);
app.use(errors.errorHandler);

// connect to atlas and run server
(async () => {
  try {
    await mongoose.connect(db, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });
    console.log(`Successfully connected to Atlas`);
    app.listen(PORT);
    console.log(`Server Listening at port ${PORT}`);
  } catch (e) {
    console.log(e);
  }
})();
