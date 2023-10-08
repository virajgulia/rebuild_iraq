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

handler.post(async (req, res) => {
  // const { name, title, description, isSubcategory, parent } = req.body;
  const category = new TenderCategory({ ...req.body, subCategories: [] });
  await category.save();

  if (req.body.parent) {
    // find parent
    const parent = await TenderCategory.findById(req.body.parent);
    const subCategories = parent.subCategories || [];
    subCategories.push(category._id);

    await TenderCategory.findByIdAndUpdate(
      parent._id,
      {
        $addToSet: { subCategories: subCategories },
      },
      (error, result) => {
        console.log("error: ", error);
        res.status(200).json(category);
      }
    );
  } else {
    res.status(200).json(category);
  }
});

export default connectDb(handler);
