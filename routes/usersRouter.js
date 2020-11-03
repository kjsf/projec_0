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
          if (req.body.firstname) {
            user.firstname = req.body.firstname;
          }
          if (req.body.lastname) {
            user.lastname = req.body.lastname;
          }
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
      res.status(302).redirect("/users/submit");
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

userRouter.get("/submit", authenticate.verifyOrdinaryUser, (req, res, next) => {
  user = req.user.username;
  res.render("submit", { user });
});

userRouter.get("/logout", (req, res) => {
  req.logout();
  res.cookie("jwt", "", { maxAge: 1 }).redirect("/");
});

module.exports = userRouter;
