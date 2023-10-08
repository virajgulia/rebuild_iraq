const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TenderSchema = new Schema(
  {
    // basic
    tenderTitle: { type: String },
    tenderValue: { type: String },
    tenderDetail: { type: String },
    tenderURL: { type: String },
    dueDate: { type: String },
    slug: { type: String },
    // company
    company: { type: Schema.Types.ObjectId, ref: "Company" },
    // contact
    contact: { type: Schema.Types.ObjectId, ref: "Contact" },
    // categories
    categories: [{ type: Schema.Types.ObjectId, ref: "TenderCategory" }],
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Tender || mongoose.model("Tender", TenderSchema);
