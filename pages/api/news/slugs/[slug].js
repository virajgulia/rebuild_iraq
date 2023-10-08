import connectDb from "../../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");
const News = require("../../../../models/new");
const handler = nextConnect();

handler.get(async (req, res) => {
  const {
    query: { slug },
  } = req;
  let news = await News.findOne({ slug }).exec();
  res.status(200).json(news);
});

export default connectDb(handler);
