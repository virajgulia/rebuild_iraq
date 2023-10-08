const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ENERGY_TYPE = ["Oil", "Gas", "Solar", "Wind", "Nuclear"];
const TYPE = ["Production", "Exploratory", "Structures/equipment"];

const AssetSchema = new Schema(
  {
    projectId: { type: Schema.Types.ObjectId, ref: "Projects" },
    name: { type: String, required: true },
    type: { type: String, required: true, enum: TYPE },
    // seller: { type: String, required: true },
    energyType: { type: String, required: true, enum: ENERGY_TYPE },
    // operator: { type: Schema.Types.ObjectId, ref: 'Users',required: true},
    // filesUpload: {
    //   projectsDocument: { type: Array},
    //   confidential: { type: Array},
    // },
    // fundOpenedDate: { type: Date, required: true },
    // fundCompleteDate: { type: Date, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.models.Assets || mongoose.model("Assets", AssetSchema);
