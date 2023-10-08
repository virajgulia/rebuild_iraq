import connectDb from "../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");
import uploadMulter from "../../../middleware/uploadMulter";
import uploadMulterS3 from "../../../middleware/uploadMulterS3";
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

handler.post(uploadMulterS3.array("files"), async (req, res) => {
  try {
    const { SPVId, SPVName, description, country, state, tokenName } = req.body;
    const files = req.files;
    const arrImageFile = files.filter((item) => {
      return getFileType(item) === "image";
    });
    const arrFile = files.filter((item) => {
      return getFileType(item) === "file";
    });
    let today = new Date();
    const currentDate = today.getFullYear() + "" + parseInt(today.getMonth()+1) + "" + today.getDate();
    let spv = new SPV({
      SPVId,
      SPVName,
      description,
      country,
      state,
      tokenName,
      slug: SPVName.replace(/  +/g, " ")
        .replace(/ /g, "-")
        .concat("-")
        .concat(currentDate),
    });
    spv.image = arrImageFile[0];
    if (req.body.dataProjectObject) {
      const { dataProjectObject } = req.body;
      const spvId = spv._id;
      const dataProject = JSON.parse(dataProjectObject);
      let i = 0;
      let lenPro = 0;
      let lenCon = 0;
      await dataProject.map(async (item, index) => {
        let project = new Project({
          SPVId: spvId,
          name: item.name,
          description: item.description,
          owner: item.owner,
          operator: item.operator,
          // country: item.country,
          // state: item.state,
          // type: item.type,
        });
        project.image = arrImageFile[index + 1];
        let projectId = project._id;
        spv.listProject.push(projectId);
        lenPro = lenPro + item.projectsDocument.length;
        lenCon = lenPro + item.confidential.length;
        for (i; i < lenPro; i++) {
          project.projectsDocument.push(arrFile[i]);
        }
        for (i; i < lenCon; i++) {
          project.confidential.push(arrFile[i]);
        }
        lenPro = i;
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
        if (index === dataProject.length - 1) {
          await spv.save();
        }
      });
    } else {
      await spv.save();
    }
    res.status(200).json(spv);
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: "SPV-ID already exists!" });
  }
});

export default connectDb(handler);
