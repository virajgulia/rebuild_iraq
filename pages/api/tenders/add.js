import connectDb from "../../../middleware/dbMiddleware";
import slugify from "slugify";
const nextConnect = require("next-connect");

const Tenders = require("../../../models/tender");
const Companies = require("../../../models/company");
const Contacts = require("../../../models/contact");

const handler = nextConnect();

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

handler.post(async (req, res) => {
  const {
    companyCountry,
    companyEmail,
    companyName,
    companyPhoneNumber,
    companyWebsite,
    documentsURL,
    dueDate,
    email,
    firstName,
    jobTitle,
    lastName,
    phoneNumber,
    selectedCategories,
    storeCompanyInDatabase,
    storeContactInDatabase,
    tenderDetails,
    tenderTitle,
    tenderType,
    tenderValue,
  } = req.body;

  let slug = tenderTitle ? slugify(tenderTitle) : "";

  const checkSlug = await Tenders.findOne({ slug });
  if (checkSlug) {
    const subSlug = Math.floor(Math.random() * 100000 + 100000);
    slug = slug + String(subSlug);
  }

  let company = null;
  if (req.body.companyID) {
    // find company
    company = await Companies.findById(req.body.companyID);
  } else {
    //  create company
    company = new Companies({
      name: companyName,
      email: companyEmail,
      country: companyCountry,
      website: companyWebsite,
      phone: companyPhoneNumber,
      storeInDatabase: storeCompanyInDatabase,
    });
    await company.save();
  }

  let contact = null;
  if (req.body.contactID) {
    contact = await Contacts.findById(req.body.contactID);
  } else {
    // create contact
    contact = new Contacts({
      firstName,
      lastName,
      email,
      jobTitle,
      phoneNumber,
      storeInDatabase: storeContactInDatabase,
    });
    await contact.save();
  }

  // create tender
  const tender = new Tenders({
    slug,
    tenderTitle: tenderTitle,
    tenderValue,
    tenderDetail: tenderDetails,
    tenderURL: documentsURL,
    dueDate: dueDate,
    company: company._id,
    contact: contact._id,
    categories: selectedCategories,
  });

  await tender.save();

  res.status(200).json(tender);
});

export default connectDb(handler);
