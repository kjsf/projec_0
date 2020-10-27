const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const errors = require("./config/errors");
const helmet = require("helmet");
const passport = require("passport");
const cookieParser = require("cookie-parser");
const authenticate = require("./config/authenticate");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// import routes
const userRouter = require("./routes/usersRouter");
const itemsRouter = require("./routes/itemsRouter");

// middlewares
app.use(morgan("dev"));
//app.use(helmet());
app.use(express.json());
app.use(passport.initialize());
app.use(cookieParser());
app.use(express.static("public"));
app.set("view engine", "ejs");

// test
app.get("/", (req, res) => {
  res.render("index");
});

// routes
app.use("/users", userRouter);
app.use("/items", itemsRouter);

// error handling
app.use(errors.notFound);
app.use(errors.errorHandler);

// connect to atlas and run server
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  },
  () => {
    console.log(`Successfully connected to Atlas`);
  }
);

app.listen(PORT, () => {
  console.log(`Server Listening at port ${PORT}`);
});
