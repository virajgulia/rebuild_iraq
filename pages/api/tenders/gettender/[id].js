const nextConnect = require("next-connect");
import connectDb from "../../../../middleware/dbMiddleware";
const Tender = require("../../../../models/tender");
const handler = nextConnect();

handler.get(async (req, res) => {
  try {
    const {
      query: { id },
    } = req;

    let tender = await Tender.findOne(
      { _id: id },

      (err) => {
        if (err) throw err;
      }
    ).exec();
    return res.status(200).json(tender);
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: error });
  }
});
export default connectDb(handler);
