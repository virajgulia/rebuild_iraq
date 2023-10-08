import connectDb from "../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");
import uploadMulterS3 from "../../../middleware/uploadMulterS3";

const TenderCategory = require("../../../models/tender-category");
const handler = nextConnect();

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

handler.get(async (req, res) => {
  // const { name, title, description, isSubcategory, parent } = req.body;
  const categories = await TenderCategory.find({ isSubcategory: false })
    .populate("subCategories")
    .sort("name");
  res.status(200).json(categories);
});

export default connectDb(handler);
