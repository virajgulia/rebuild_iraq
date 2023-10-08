// import connectDb from "../../../middleware/dbMiddleware";
// const nextConnect = require("next-connect");
// import uploadMulterS3 from "../../../middleware/uploadMulterS3";

// const News = require("../../../models/new");
// const handler = nextConnect();

// export const config = {
//   api: {
//     bodyParser: false,
//   },
// };

// handler.post(uploadMulterS3.single("image"), async (req, res) => {
//   try {
//     const { title, description, releasedDate, status, editorHtml } = JSON.parse(
//       req.body.data
//     );
//     const slug = title ? title.replace(/\s/g, "-") : "";

//     const checkSlug = await News.findOne({ slug });
//     if (checkSlug) {
//       const subSlug = Math.floor(Math.random() * 100000 + 100000);
//       slug = slug + String(subSlug);
//     }

//     let news = new News({
//       title,
//       status,
//       link: "link",
//       description,
//       releasedDate,
//       editorHtml,
//       slug,
//     });
//     if (req.file) {
//       news.thumbnail = req.file;
//     }
//     await news.save();
//     res.status(200).json(news);
//   } catch (error) {
//     console.log(error);
//     res.status(401).json({ msg: error });
//   }
// });

// export default connectDb(handler);

import connectDb from "../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");

const News = require("../../../models/new");
const handler = nextConnect();

handler.post((req, res) => {
  const { releasedDate, title, description, editorHtml, status, thumbnail } =
    req.body;

  const titleSlug = title.replace(/\s/g, "-");

  const news = new News({
    slug: `${titleSlug}-${Math.round(Math.random() * 100000 + 100)}`,
    releasedDate,
    title,
    description,
    editorHtml,
    status,
    thumbnail,
  });

  news.save();
  res.status(200).send({ message: "It's Working!" });
});

export default connectDb(handler);
