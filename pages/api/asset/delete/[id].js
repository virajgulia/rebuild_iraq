const nextConnect = require("next-connect");
import connectDb from "../../../../middleware/dbMiddleware";
const Project = require("../../../../models/project");
const Asset = require("../../../../models/asset");
const handler = nextConnect();

handler.delete(async (req, res) => {
  const {
    query: { id },
  } = req;
  await Asset.findOneAndDelete({ _id: id }, async (err, doc) => {
    if (doc === null)
      return res.status(401).json({ message: "Asset Not found" });
    else {
      const project = await Project.findOne({ _id: doc.projectId });
      const index = project.listAsset.indexOf(id);
      if (index > -1) {
        project.listAsset.splice(index, 1);
        project.save();
      }
      return res.status(200).json({ message: "Delete Asset successfully" });
    }
  });
});

export default connectDb(handler);
