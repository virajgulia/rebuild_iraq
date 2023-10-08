import connectDb from "../../../middleware/dbMiddleware";
const nextConnect = require('next-connect')
const SPV = require("../../../models/SPV");
const Projects = require("../../../models/project");
const handler = nextConnect();

handler.get(async (req, res) => {
  let spv = await SPV.find({})
  .populate({
    path: "listProject",
    model: "Projects",
  })
  .exec();
  res.status(200).json(spv);
})

export default connectDb(handler);