import connectDb from "../../../middleware/dbMiddleware";
import moment from "moment";
const jwt = require("jsonwebtoken");
const nextConnect = require("next-connect");
const checkAuth = require("../../../middleware/authentication");

const Tenders = require("../../../models/tender");
const Companies = require("../../../models/company");
const Contacts = require("../../../models/contact");
const TenderCategory = require("../../../models/tender-category");
const Users = require("../../../models/user");

const handler = nextConnect();

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// handler.use(checkAuth);
handler.get(async (req, res) => {
  try {
    const {
      query: { slug },
    } = req;

    const tender = await Tenders.findOne({ slug })
      .populate("company")
      .populate("contact")
      .populate("categories")
      .exec();
    // res.status(200).json(tender );
    const authorizationHeader = req.headers.authorization;
    let token;

    if (authorizationHeader) {
      token = authorizationHeader.split(" ")[1];
    }

    if (token) {
      try {
        const decodedToken = await jwt.verify(token, "secret", {
          expiresIn: "7d",
        });

        const user = await Users.findById(decodedToken.id).exec();
        const beforeTime = moment(user.startPlan);
        const nowTime = moment(new Date());
        const leftHours = nowTime.diff(beforeTime, "hours");
        console.log("leftHours: ", leftHours);
        if (leftHours < 48 || user.isAdmin) {
         
          res.status(200).json({ tender });
        } else {
          res.status(200).json({
            planName: user.planName,
            requestChangePlan: true,
            isLogined: true,
          });
        }
      } catch (err) {
        console.log(err);
        return res.status(401).json({ msg: "Error Token!" });
      }
    } else {
      res.status(200).json({
        planName: null,
        requestChangePlan: true,
        isLogined: false,
        tender,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
});

// delete tender
handler.delete(async (req, res) => {
  try {
    const {
      query: { slug },
    } = req;
    const { isContact, isCompany, isTender } = req.body;

    const tender = await Tenders.findById(slug).exec();

    if (isContact) {
      await Contacts.findByIdAndDelete(tender.contact, (err, result) => {
        if (err) {
          console.log("err: ", err);
        } else {
          console.log("result: ", result);
        }
      });
    }

    if (isCompany) {
      await Companies.findByIdAndDelete(tender.company, (err, result) => {
        if (err) {
          console.log("err: ", err);
        } else {
          console.log("result: ", result);
        }
      });
    }

    if (isTender) {
      await Tenders.findByIdAndDelete(slug, (err, result) => {
        if (err) {
          console.log("err: ", err);
        } else {
          console.log("result: ", result);
        }
      });
    }

    res.status(201).json({
      msg: "Deleted success",
    });
  } catch (error) {
    console.log("err: ", error);
    res.status(400).json(error);
  }
});

export default connectDb(handler);
