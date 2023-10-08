import connectDb from "../../../../middleware/dbMiddleware";
import tender from "../../../../models/tender";
const jwt = require("jsonwebtoken");
const nextConnect = require("next-connect");

const Tenders = require("../../../../models/tender");
const Users = require("../../../../models/user");

const handler = nextConnect();

handler.get(async (req, res) => {
    
    let alltander = await tender.find()
      .populate({
        path: "listTenders",
        model: "Tenders",
        populate: [
          {
            path: "listAsset",
            model: "Assets",
          },
        ],
      }).count()
      .exec();
    res.status(200).json({"Success": true, tendersCount: alltander});

  });

  export default connectDb(handler);