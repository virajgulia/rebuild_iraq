import connectDb from "../../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");
const SPV = require("../../../../models/SPV");
const handler = nextConnect();

handler.get(async (req, res) => {
  const {
    query: { id },
  } = req;
  let spv = await SPV.findOne({ SPVId: id }).exec();
  let isExistId = false;
  if (spv) {
    isExistId = true;
  } else {
    isExistId = false;
  }
  res.status(200).json(isExistId);
});

export default connectDb(handler);
