// import connectDb from "../../../middleware/dbMiddleware";
// const nextConnect = require("next-connect");
// import moment from "moment";

// const Tenders = require("../../../models/tender");
// const Companies = require("../../../models/company");
// const Contacts = require("../../../models/contact");
// const TenderCategory = require("../../../models/tender-category");

// const handler = nextConnect();

// export const config = {
//   api: {
//     bodyParser: {
//       sizeLimit: "100mb", // Set desired value here
//     },
//   },
// };

// handler.get(async (req, res) => {
//   let query = {};
//   if (req.query?.search && req.query?.search !== "undefined") {
//     query = {
//       tenderTitle: { $regex: req.query.search, $options: "i" },
//     };
//   }
//   const page = req.query.pageIndex ? +req.query.pageIndex : 1;
//   const limit = req.query.pageSize ? +req.query.pageSize : 50;
//   const skip = (page - 1) * limit;

//   const today = moment().format("MM/DD/YYYY");
//   const tenders = await Tenders.find(query)
//     .populate("company")
//     .populate("contact")
//     .populate("categories")
//     .skip(skip)
//     .limit(limit)
//     .sort({ createdAt: -1 })

//     .exec();
//   res.status(200).json({ tenders });

// });

// export default connectDb(handler);

import connectDb from "../../../middleware/dbMiddleware";
const Tenders = require("../../../models/tender");
const nextConnect = require("next-connect");

const handler = nextConnect();

handler.get(async (req, res) => {
  const { page } = req.query;
  const num = page - 1;

  const allTenders = await Tenders.find({})
    .sort({ updatedAt: -1 })
    .skip(num * 50)
    .limit(50)
    .exec();

  res.status(200).json(allTenders);
});

export default connectDb(handler);
