const express = require("express");
const Items = require("../models/items");

const itemsRouter = express.Router();

itemsRouter
  .route("/")
  .get(async (req, res) => {
    try {
      found = await Items.find();
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

itemsRouter
  .route("/:itemid")
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

module.exports = itemsRouter;
