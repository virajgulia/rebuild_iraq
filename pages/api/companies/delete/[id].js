const nextConnect = require("next-connect");
import connectDb from "../../../../middleware/dbMiddleware";
const companies = require("../../../../models/company");
const handler = nextConnect();

handler.delete(async (req, res) => {
  const {
    query: { id },
  } = req;
  await companies.findOneAndDelete({ _id: id }, async (err, doc) => {
    if (doc === null)
      return res.status(401).json({ message: "Companies Not found" });
    else {
      return res.status(200).json({ message: "Delete Companies successfully" });
    }
  });
});

export default connectDb(handler);
