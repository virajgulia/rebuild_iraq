import connectDb from "../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");
const Users = require("../../../models/user");
const handler = nextConnect();
const checkAuth = require("../../../middleware/authentication");

handler.use(checkAuth);

handler.get(async (req, res) => {
  const user = await Users.findById(req.user.id).select("-password");

  res.status(200).json(user);
});

handler.put(async (req, res) => {
  const data = req.body;
  const user = await Users.findOneAndUpdate(
    { _id: req.user.id },
    { $set: data },
    (err, result) => {
      if (err) {
        console.log("err: ", err);
        res.status(401).json(err);
      }
      console.log(result);
      res.status(200).json(result);
    }
  ).select("-password");
});

export default connectDb(handler);
