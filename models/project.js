const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// const TYPE_PROJECT = ["Production", "Exploratory", "Equipment"];

const ProjectSchema = new Schema(
  {
    SPVId: { type: Schema.Types.ObjectId, ref: 'SPVs' },
    name: { type: String, required: true },
    description: { type: String},
    owner: { type: String, required: true },
    operator: { type: String, required: true },
    // country:{ type: String, required: true},
    // state:{ type: String, required: true},
    listAsset: [{ type: Schema.Types.ObjectId, ref: 'Assets'}],
    projectsDocument: { type: Array,  default: []},
    confidential: { type: Array,  default: []},
    // filesUpload: {
    //   projectsDocument: { type: Array, default: []},
    //   confidential: { type: Array,  default: []},
    // },
    // type: {type: String, required: true, enum: TYPE_PROJECT},
    image: {type: Object}
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.Projects || mongoose.model("Projects", ProjectSchema);
