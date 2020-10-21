const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemschema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
});

const Items = mongoose.model("item", itemschema);

module.exports = Items;
