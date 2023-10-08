import connectDb from "../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");

const Tenders = require("../../../models/tender");
const Companies = require("../../../models/company");
const Contacts = require("../../../models/contact");

const handler = nextConnect();

handler.get(async (req, res) => {
  const companies = await Companies.find().sort("name");

  res.status(200).json(companies);
});

export default connectDb(handler);
