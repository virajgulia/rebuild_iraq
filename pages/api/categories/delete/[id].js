const nextConnect = require("next-connect");
import connectDb from "../../../../middleware/dbMiddleware";
const TenderCategory = require("../../../../models/tender-category");
const handler = nextConnect();

handler.delete(async (req, res) => {
  const {
    query: { id },
  } = req;
  await TenderCategory.findOneAndDelete({ _id: id }, async (err, doc) => {
    if (doc === null)
      return res.status(401).json({ message: "Category Not found" });
    else {
      return res.status(200).json({ message: "Delete Category successfully" });
    }
  });
});

export default connectDb(handler);
