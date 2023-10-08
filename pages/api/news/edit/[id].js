const nextConnect = require("next-connect");
import connectDb from "../../../../middleware/dbMiddleware";
import uploadMulterS3 from "../../../../middleware/uploadMulterS3";

const News = require("../../../../models/new");
const handler = nextConnect();

export const config = {
  api: {
    bodyParser: false,
  },
};

handler.put(uploadMulterS3.single("image"), async (req, res) => {
  try {
    const {
      query: { id },
    } = req;

    const {
      title,
      description,
      releasedDate,
      status,
      editorHtml,
    } = JSON.parse(req.body.data);

    let slug = title ? title.replace(/\s/g, "-") : "";

    const checkSlug = await News.findOne({ slug });
    if (checkSlug && checkSlug.title !== title) {
      const subSlug = Math.floor(Math.random() * 100000 + 100000);
      slug = slug + String(subSlug);
    }

    const dataUpdate = {
      title,
      status,
      description,
      releasedDate,
      editorHtml,
      slug,
    };

    if (req.file) {
      dataUpdate.thumbnail = req.file;
    }

    let news = await News.findOneAndUpdate(
      { _id: id },
      {
        $set: dataUpdate,
      },
      (err, response) => {
        if (err) throw err;
      }
    ).exec();

    return res.status(200).json(news);
  } catch (error) {
    console.log(error);
    res.status(401).json({ msg: error });
  }
});

export default connectDb(handler);
