const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CompanySchema = new Schema(
  {
    name: { type: String },
    email: { type: String },
    country: { type: String },
    website: { type: String },
    phone: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Company || mongoose.model("Company", CompanySchema);
