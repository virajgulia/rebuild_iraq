import connectDb from "../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");
const News = require("../../../models/new");
const handler = nextConnect();

handler.get(async (req, res) => {
  let news = await News.find({}).sort({ releasedDate: -1 }).limit(40).exec();
  res.status(200).json(news);
});

export default connectDb(handler);
