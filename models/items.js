const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemschema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    unitcode: { type: String, required: true },
    unitcount: { type: Number, required: true },
    condition: { type: String, required: true },
    remarks: { type: String, required: true },
  },
  { timestamps: true }
);

const Items = mongoose.model("item", itemschema);

module.exports = Items;
