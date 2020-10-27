const express = require("express");
const Items = require("../models/items");
const authenticate = require("../config/authenticate");

const itemsRouter = express.Router();

itemsRouter
  .route("/")
  .post(authenticate.verifyOrdinaryUser, async (req, res, next) => {
    try {
      await Items.create({
        user: req.user._id,
        unitcode: req.body.unitcode,
        unitcount: req.body.unitcount,
        condition: req.body.condition,
        remarks: req.body.remarks,
      });
      res.status(200).json({ success: true });
    } catch (e) {
      next(e);
    }
  });

module.exports = itemsRouter;
