const nextConnect = require("next-connect");
import connectDb from "../../../../middleware/dbMiddleware";
const Tender = require("../../../../models/tender");
const handler = nextConnect();

handler.put(async (req, res) => {
  try {
    const {
      query: { id },
    } = req;

    const data = req.body;
    let tender = await Tender.findOneAndUpdate(
      { _id: id },
      {
        $set: data,
      },

      (err) => {
        if (err) throw err;
      }
    ).exec();
    return res.status(200).json("Successfully Updated");
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: error });
  }
});

export default connectDb(handler);
