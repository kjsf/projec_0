const express = require("express");
const Items = require("../models/items");
const authenticate = require("../config/authenticate");

const itemsRouter = express.Router();

itemsRouter
  .route("/")
  .post(authenticate.verifyOrdinaryUser, async (req, res, next) => {
    try {
      const data = req.body.map((item) => {
        return { ...item, user: req.user._id };
      });
      await Items.insertMany(data);
      res.status(200).json({ success: true });
    } catch (e) {
      next(e);
    }
  });

module.exports = itemsRouter;
