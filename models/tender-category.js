const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const TenderCategorySchema = new Schema(
  {
    name: { type: String },
    title: { type: String },
    description: { type: String },
    isSubcategory: { type: Boolean },
    subCategories: { type: Array },
    parent: { type: Schema.Types.ObjectId },
  },
  { timestamps: true }
);

module.exports =
  mongoose.models.TenderCategory ||
  mongoose.model("TenderCategory", TenderCategorySchema);
