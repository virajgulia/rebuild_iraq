const nextConnect = require("next-connect");
const fs = require("fs");
import connectDb from "../../../../middleware/dbMiddleware";
import uploadMulterS3 from "../../../../middleware/uploadMulterS3";
import deleteFileS3 from "../../../../middleware/deleteFileS3";
const SPV = require("../../../../models/SPV");
const handler = nextConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.put(uploadMulterS3.single("image"), async (req, res) => {
  const {
    query: { id },
  } = req;
  const { SPVName, country, description, state, tokenName } = req.body;
  let spv = await SPV.findOne({ SPVId: id });
  spv.SPVName = SPVName;
  spv.country = country;
  spv.description = description;
  spv.state = state;
  spv.tokenName = tokenName;
  if (req.file) {
    // fs.unlinkSync(`./public/uploads/image/${spv.image.filename}`);
    deleteFileS3([{ Key: spv.image && spv.image.key }]);
    spv.image = req.file;
  }
  await spv.save();
  return res.status(200).json(spv);
});

export default connectDb(handler);
