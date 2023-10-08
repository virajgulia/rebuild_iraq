const nextConnect = require("next-connect");
import connectDb from "../../../../middleware/dbMiddleware";
const News = require("../../../../models/new");
const handler = nextConnect();

handler.delete(async (req, res) => {
  const {
    query: { id },
  } = req;
  await News.findOneAndDelete({ _id: id }, async (err, doc) => {
    if (doc === null)
      return res.status(401).json({ message: "News Not found" });
    else {
      return res.status(200).json({ message: "Delete News successfully" });
    }
  });
});

export default connectDb(handler);
