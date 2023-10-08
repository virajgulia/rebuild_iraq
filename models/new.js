const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const STATUS = ["open", "block", "prepare"];

const NewSchema = new Schema(
  {
    slug: { type: String, required: true },
    releasedDate: { type: Date, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    editorHtml: { type: String },
    status: { type: String, required: true, enum: STATUS },
    thumbnail: { type: Object },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.models.News || mongoose.model("News", NewSchema);
