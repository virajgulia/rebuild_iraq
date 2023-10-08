import connectDb from "../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");
const fs = require("fs");
import uploadMulterS3 from "../../../middleware/uploadMulterS3";
import deleteFileS3 from "../../../middleware/deleteFileS3";
const SPV = require("../../../models/SPV");
const Project = require("../../../models/project");
const Asset = require("../../../models/asset");
const handler = nextConnect();
export const config = {
  api: {
    bodyParser: false,
  },
};

const getFileType = (file) => {
  if (file.mimetype.match("image")) return "image";
  if (file.mimetype.match("video")) return "video";
  if (file.mimetype.match("audio")) return "audio";
  if (file.mimetype.match("application")) return "file";
  return "other";
};

handler.put(uploadMulterS3.array("files"), async (req, res) => {
  try {
    const { dataProjectObject } = req.body;
    const files = req.files;
    const arrImageFile = files.filter((item) => {
      return getFileType(item) === "image";
    });
    const arrFile = files.filter((item) => {
      return getFileType(item) === "file";
    });
    const dataProject = JSON.parse(dataProjectObject);
    let indexImage = 0;
    let indexFile = 0;
    let lenPro = 0;
    let lenCon = 0;
    await dataProject.map(async (item, index) => {
      if (item.id) {
        let project = await Project.findById({ _id: item.id });
        project.name = item.name;
        // project.country = item.country;
        // project.state = item.state;
        project.owner = item.owner;
        project.operator = item.operator;
        project.description = item.description;
        // project.type = item.type;
        if (!item.image.originalname) {
          // fs.unlinkSync(`./public/uploads/image/${project.image.filename}`);
          let imageProject = project.image && project.image.key;
          deleteFileS3([{ Key: imageProject }]);
          project.image = arrImageFile[index];
          indexImage = indexImage + 1;
        }
        let projectsDocument = [];
        item.projectsDocument.map((file, i) => {
          if (file.originalname) {
            projectsDocument.push(file);
          } else {
            projectsDocument.push(arrFile[indexFile]);
            indexFile = indexFile + 1;
          }
        });
        project.projectsDocument = projectsDocument;
        let confidential = [];
        item.confidential.map((file, i) => {
          if (file.originalname) {
            confidential.push(file);
          } else {
            confidential.push(arrFile[indexFile]);
            indexFile++;
          }
        });
        project.confidential = confidential;
        if (item.listAsset.length > 0) {
          item.listAsset.map(async (as, i) => {
            if (as.id) {
              let asset = await Asset.findById({ _id: as.id });
              asset.name = as.name;
              // asset.operator = as.operator;
              asset.type = as.type;
              asset.energyType = as.energyType;
              await asset.save();
            } else {
              let asset = new Asset({
                projectId: item.id,
                name: as.name,
                // operator: as.operator,
                type: as.type,
                energyType: as.energyType
              });
              let assetId = asset._id;
              await asset.save();
              project.listAsset.push(assetId);
            }
            if (i === item.listAsset.length - 1) {
              await project.save();
            }
          });
        } else {
          await project.save();
        }
      } else {
        let project = new Project({
          SPVId: item.spvId,
          name: item.name,
          description: item.description,
          owner: item.owner,
          operator: item.operator,
          // country: item.country,
          // state: item.state,
          // type: item.type,
        });
        let projectId = project._id;
        project.image = arrImageFile[indexImage];
        lenPro = lenPro + item.projectsDocument.length;
        lenCon = lenPro + item.confidential.length;
        for (indexFile; indexFile < lenPro; indexFile++) {
          project.projectsDocument.push(arrFile[indexFile]);
        }
        for (indexFile; indexFile < lenCon; indexFile++) {
          project.confidential.push(arrFile[indexFile]);
        }
        lenPro = lenPro + 1;
        if (item.listAsset.length > 0) {
          await item.listAsset.map(async (as, i) => {
            let asset = new Asset({
              projectId: projectId,
              name: as.name,
              // operator: as.operator,
              type: as.type,
              energyType: as.energyType,
            });
            await asset.save();
            let assetId = asset._id;
            project.listAsset.push(assetId);
            if (i === item.listAsset.length - 1) {
              await project.save();
            }
          });
        } else {
          await project.save();
        }
        let spv = await SPV.findById({ _id: item.spvId });
        spv.listProject.push(projectId);
        await spv.save();
      }
    });
    return res.status(200).json({ message: "Update Project successfully" });
  } catch (error) {
    console.log(error);
  }
});

export default connectDb(handler);
