const express = require("express");
const Users = require("../models/users");

const usersRoute = express.Router();

usersRoute
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

usersRoute
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

module.exports = usersRoute;
