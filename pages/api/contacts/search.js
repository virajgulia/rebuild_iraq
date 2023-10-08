import connectDb from "../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");

const Tenders = require("../../../models/tender");
const Companies = require("../../../models/company");
const Contacts = require("../../../models/contact");

const handler = nextConnect();

handler.get(async (req, res) => {
  const { name } = req.query;

  const contactsStoreDatabase = await Contacts.find({
    $and: [
      {
        $or: [
          { firstName: { $regex: new RegExp(name, "i") } },
          { lastName: { $regex: new RegExp(name, "i") } },
          // { email: { $regex: new RegExp(name, "i") } },
          // { jobTitle: { $regex: new RegExp(name, "i") } },
          // { phoneNumber: { $regex: new RegExp(name, "i") } },
        ],
      },
    ],
  }).sort("updatedAt");

  res.status(200).json(contactsStoreDatabase);
});

export default connectDb(handler);
