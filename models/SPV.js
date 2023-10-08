const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const SPVSchema = new Schema(
  {
    SPVId: { type: String, required: true, unique: true },
    SPVName: { type: String, required: true },
    description: { type: String },
    country: { type: String, required: true },
    state: { type: String, required: true },
    tokenName: { type: String, required: true },
    image: { type: Object },
    listProject: [{ type: Schema.Types.ObjectId, ref: "Projects" }],
    slug: { type: String, required: true, unique: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.SPVs || mongoose.model("SPVs", SPVSchema);
