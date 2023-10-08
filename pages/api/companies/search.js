import connectDb from "../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");

const Tenders = require("../../../models/tender");
const Companies = require("../../../models/company");
const Contacts = require("../../../models/contact");

const handler = nextConnect();

handler.get(async (req, res) => {
  const { name } = req.query;
  const companiesStoreDatabase = await Companies.find({
    name: { $regex: new RegExp(name, "i") },
  }).sort("name");

  res.status(200).json(companiesStoreDatabase);
});

export default connectDb(handler);
