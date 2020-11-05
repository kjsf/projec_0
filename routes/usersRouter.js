const express = require("express");
const Users = require("../models/users");
const passport = require("passport");
const authenticate = require("../config/authenticate");

const userRouter = express.Router();

userRouter
  .route("/register")
  .get((req, res, next) => {
    res.render("register");
  })
  .post((req, res) => {
    console.log(`Register Hit`);
    Users.register(
      new Users({ username: req.body.username }),
      req.body.password,
      (err, user) => {
        if (err) {
          res.status(403).json({ err: err });
        } else {
          user.firstname = req.body.firstname;
          user.lastname = req.body.lastname;
          user.save((err, user) => {
            if (err) {
              next(err);
            } else {
              passport.authenticate("local")(req, res, () => {
                res.status(200).json({ user: user._id });
              });
            }
          });
        }
      }
    );
  });

userRouter
  .route("/login")
  .get((req, res, next) => {
    if (req.cookies["jwt"]) {
      res.status(302).redirect("/users/items");
    } else {
      res.render("login");
    }
  })
  .post(passport.authenticate("local"), (req, res, next) => {
    console.log(`Login Hit`);
    const token = authenticate.getToken({ _id: req.user._id });
    res.cookie("jwt", token, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    res.status(200).json({ success: true });
  });

userRouter.get("/items", authenticate.verifyOrdinaryUser, (req, res, next) => {
  const user = req.user.username;
  res.render("items", { user });
});

userRouter
  .route("/submit")
  .post(authenticate.verifyOrdinaryUser, (req, res, next) => {
    const itemCount = req.body.itemcount;
    res.cookie("count", itemCount, { httpOnly: true, maxAge: 60 * 60 * 1000 });
    res.status(200).json({ success: true });
  })
  .get(authenticate.verifyOrdinaryUser, (req, res, next) => {
    const user = req.user.username;
    const count = req.cookies["count"];
    res.render("submit", { user, count });
  });

userRouter.get("/logout", (req, res) => {
  req.logout();
  res.cookie("jwt", "", { maxAge: 1 }).redirect("/");
});

module.exports = userRouter;
