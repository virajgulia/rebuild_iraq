const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ContactSchema = new Schema(
  {
    firstName: { type: String },
    lastName: { type: String },
    email: { type: String },
    jobTitle: { type: String },
    phoneNumber: { type: String },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Contact || mongoose.model("Contact", ContactSchema);
