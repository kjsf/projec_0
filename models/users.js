const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    unique: true,
    require: true,
  },
});

const Users = mongoose.model("user", userSchema);

module.exports = Users;
