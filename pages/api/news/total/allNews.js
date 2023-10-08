import connectDb from "../../../../middleware/dbMiddleware";
const jwt = require("jsonwebtoken");
const nextConnect = require("next-connect");

const News = require("../../../../models/new");

const handler = nextConnect();

handler.get(async (req, res) => {
    
    let allNews = await News.find()
      .populate({
        path: "listNews",
        model: "news",
        populate: [
          {
            path: "listAsset",
            model: "Assets",
          },
        ],
      }).count()
      .exec();
    res.status(200).json({"Success": true, newsCount: allNews});

  });

  export default connectDb(handler);