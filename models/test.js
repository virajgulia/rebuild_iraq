const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TestSchema = new Schema(
  {
    name: { type: String },
    title: { type: String },
    description: { type: String },
    subCategories: { type: Array },
    isSubcategory: { type: Boolean },
    parent: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.Test || mongoose.model("Test", TestSchema);
