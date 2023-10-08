import connectDb from "../../../middleware/dbMiddleware";
const nextConnect = require("next-connect");
const Users = require("../../../models/user");
const handler = nextConnect();
const checkAuth = require("../../../middleware/authentication");

handler.use(checkAuth);

handler.get(async (req, res) => {
  let users = await Users.find({}).exec();
  res.status(200).json(users);
});

export default connectDb(handler);
