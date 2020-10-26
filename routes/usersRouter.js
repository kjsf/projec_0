const express = require("express");
const Users = require("../models/users");
const passport = require("passport");
const authenticate = require("../config/authenticate");

const userRouter = express.Router();

userRouter
  .route("/")
  .get(async (req, res) => {
    try {
      found = await Users.find();
      res.status(200).json(found);
    } catch (e) {
      next(e);
    }
  })
  .post(async (req, res, next) => {
    try {
      console.log(`POST USER`);
      res.send(`HI`);
      res.end();
    } catch (e) {
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
    } catch (e) {
      console.log(`PUT USER`);
      res.end();
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      console.log(`delete USER`);
      res.end();
    } catch (e) {
      next(e);
    }
  });

userRouter.post("/signup", (req, res) => {
  console.log(`GOT HIT`);
  console.log(req.body);
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
            res.status(403).json({ err: err });
          }
          passport.authenticate("local")(req, res, () => {
            res.redirect("/login");
          });
        });
      }
    }
  );
});

userRouter.post("/login", passport.authenticate("local"), (req, res, next) => {
  const token = authenticate.getToken({ _id: req.user._id });
  console.log(req.body);
  const user = req.body.username;
  res.render("submit", { user: user });
});

userRouter.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/");
});

userRouter
  .route("/:userid")
  .get((req, res) => {
    console.log(`Get ${req.params.userid} USER`);
    res.end();
  })
  .post(async (req, res, next) => {
    try {
      console.log(`POST ${req.params.userid} USER`);
      res.end();
    } catch (e) {
      next(e);
    }
  })
  .put(async (req, res, next) => {
    try {
      console.log(`PUT ${req.params.userid} USER`);
      res.end();
    } catch (e) {
      next(e);
    }
  })
  .delete(async (req, res, next) => {
    try {
      console.log(`DELETE ${req.params.userid} USER`);
      res.end();
    } catch (e) {
      next(e);
    }
  });

module.exports = userRouter;
