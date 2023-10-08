const nextConnect = require("next-connect");
const fs = require("fs");
import connectDb from "../../../../middleware/dbMiddleware";
import deleteFileS3 from "../../../../middleware/deleteFileS3";
const SPV = require("../../../../models/SPV");
const Project = require("../../../../models/project");
const Asset = require("../../../../models/asset");
const handler = nextConnect();

handler.delete(async (req, res) => {
  const {
    query: { id },
  } = req;
  await SPV.findOneAndDelete({ _id: id }, async (err, doc) => {
    if (doc === null) return res.status(401).json({ message: "SPV Not found" });
    else {
      let arrFile = [];
      let imageSPV = doc.image && doc.image.key;
      arrFile.push({ Key: imageSPV });
      // fs.unlinkSync(`./public/uploads/image/${doc.image.filename}`);
      if (doc.listProject.length > 0) {
        doc.listProject.map(async (item, index) => {
          await Asset.deleteMany({ projectId: item });
          const project = await Project.findOne({ _id: item });
          let imageProject = project.image && project.image.key;
          arrFile.push({ Key: imageProject });
          if (project.projectsDocument.length > 0) {
            project.projectsDocument.map(async (file) => {
              let files = file.key;
              arrFile.push({ Key: files });
            });
          }
          if (project.confidential.length > 0) {
            project.confidential.map(async (file) => {
              let files = file.key;
              arrFile.push({ Key: files });
            });
          }
          if (index === doc.listProject.length - 1) {
            deleteFileS3(arrFile);
          }
          await Project.findOneAndDelete({ _id: item });
        });
      } else {
        deleteFileS3(arrFile);
      }
      return res.status(200).json({ message: "Delete SPV successfully" });
    }
  });
});

export default connectDb(handler);
