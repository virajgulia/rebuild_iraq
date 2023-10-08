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
  await Project.findOneAndDelete({ _id: id }, async (err, doc) => {
    if (doc === null)
      return res.status(401).json({ message: "Project Not found" });
    else {
      let arrFile = [];
      let imageProject = doc.image && doc.image.key;
      arrFile.push({ Key: imageProject });
      if (doc.projectsDocument.length > 0) {
        doc.projectsDocument.map(async (item) => {
          let files = item.key;
          arrFile.push({ Key: files });
        });
      }
      if (doc.confidential.length > 0) {
        doc.confidential.map(async (item) => {
          let files = item.key;
          arrFile.push({ Key: files });
        });
      }
      deleteFileS3(arrFile);
      // fs.unlinkSync(`./public/uploads/image/${doc.image.filename}`);
      // if (doc.projectsDocument.length > 0) {
      //   doc.projectsDocument.map(async (item) => {
      //     fs.unlinkSync(`./public/uploads/file/${item.filename}`);
      //   });
      // }
      // if (doc.confidential.length > 0) {
      //   doc.confidential.map(async (item) => {
      //     fs.unlinkSync(`./public/uploads/file/${item.filename}`);
      //   });
      // }
      if (doc.listAsset.length > 0) {
        doc.listAsset.map(async (item) => {
          await Asset.deleteMany({ _id: item });
        });
      }
      const spv = await SPV.findOne({ _id: doc.SPVId });
      const index = spv.listProject.indexOf(id);
      if (index > -1) {
        spv.listProject.splice(index, 1);
        spv.save();
      }
      return res.status(200).json({ message: "Delete Project successfully" });
    }
  });
});

export default connectDb(handler);
