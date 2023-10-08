import connectDb from "../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");
const SPV = require("../../../models/SPV");
const Projects = require("../../../models/project");
const Users = require("../../../models/user");
const Assets = require("../../../models/asset");
const handler = nextConnect();

handler.get(async (req, res) => {
  const {
    query: { slug },
  } = req;
  let spv = await SPV.findOne({ slug })
    .populate({
      path: "listProject",
      model: "Projects",
      populate: [
        {
          path: "listAsset",
          model: "Assets",
        },
      ],
    })
    .exec();
  res.status(200).json(spv);
});

export default connectDb(handler);
